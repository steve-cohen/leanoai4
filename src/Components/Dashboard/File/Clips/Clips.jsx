import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Clip from './Clip/Clip'
import Editor from './Editor/Editor'
import Filters from './Filters/Filters'
import './Clips.css'

function filterClipsbyTime(start, end, minDuration, maxDuration) {
	const clipTime = end - start
	return clipTime >= minDuration && clipTime <= maxDuration ? true : false
}

function formatDuration(milliseconds) {
	let time = new Date(milliseconds).toISOString()
	if (milliseconds < 10000) return `${time.slice(18, 19)}s`
	else if (milliseconds < 60000) return `${time.slice(17, 19)}s`
	else if (milliseconds < 600000) return `${time.slice(15, 16)}m ${time.slice(17, 19)}s`
	else if (milliseconds < 3600000) return `${time.slice(14, 16)}m ${time.slice(17, 19)}s`
	else if (milliseconds < 36000000) return `${time.slice(12, 13)}h ${time.slice(14, 16)}m ${time.slice(17, 19)}s`
	return `${time.slice(11, 13)}h ${time.slice(14, 16)}m ${time.slice(17, 19)}s`
}

function formatTimeFFMPEG(milliseconds) {
	return new Date(milliseconds).toISOString().slice(11, 23)
}

function formatTranscript(start, end, words) {
	let speaker = 'A'
	let transcript = []
	for (let i = 0; i < words.length; i++) {
		const word = words[i]
		if (word.start >= start) {
			if (word.speaker === speaker) {
				transcript.push(word.text)
			} else {
				transcript.push('\n\n' + word.text)
				speaker = word.speaker
			}
		}
		if (word.end >= end) break
	}
	return transcript.join(' ')
}

export default function Clips({ file, formatTime, isLoading, results, setFile }) {
	const { fileId } = useParams()

	const [clips, setClips] = useState()
	const [clipToEdit, setClipToEdit] = useState()
	const [isProcessing, setIsProcessing] = useState(false)
	const [percentAnalyzed, setPercentAnalyzed] = useState('0.00% Analyzed')
	const [showEditor, setShowEditor] = useState(false)
	const [trends, setTrends] = useState()

	useEffect(() => {
		setClips()
		setTrends()
		if (results) selectClips()
	}, [results])

	function selectClips() {
		let chapters = []
		let filteredClips = []

		if (results && results.status === 'completed') {
			setIsProcessing(false)

			// [1.0] Filter Clips
			// [1.1] Chapters
			if (results.chapters && results.words) {
				results.chapters.forEach(({ start, end }) => {
					chapters.push({ start, end, text: formatTranscript(start, end, results.words) })
				})
			}

			// [1.2] Utterances
			if (results.utterances) {
				results.utterances.forEach(clip => filteredClips.push(clip))
			}

			// [1.3] IAB Categories
			if (results.iab_categories_result.status === 'success') {
				results.iab_categories_result.results.forEach(({ text, timestamp }) => {
					filteredClips.push({ start: timestamp.start, end: timestamp.end, text: text })
				})
			}

			// [1.4] Content Safety Labels
			if (results.content_safety_labels.status === 'success') {
				results.content_safety_labels.results.forEach(clip => {
					filteredClips.push({ start: clip.timestamp.start, end: clip.timestamp.end, text: clip.text })
				})
			}

			// [2.0] Filter Clips by Time
			// [2.1] Filter from 30s to 120s
			let timeFilteredClips = filteredClips.filter(({ start, end }) => filterClipsbyTime(start, end, 30000, 120000))
			// [2.2] If < 30 Clips, Filter from 20s to 120s
			if (timeFilteredClips.length < 30) {
				timeFilteredClips = filteredClips.filter(({ start, end }) => filterClipsbyTime(start, end, 20000, 120000))
			}
			filteredClips = timeFilteredClips

			// [3.0] Remove Duplicate Clips
			let uniqueClips = {}
			chapters.forEach(clip => (uniqueClips[`${clip.start}-${clip.end}`] = clip))
			filteredClips.forEach(clip => (uniqueClips[`${clip.start}-${clip.end}`] = clip))

			// [4.0] Sort Clips by Start Time, then by Duration
			let newClips = Object.values(uniqueClips)
				.sort((a, b) => a.end - a.start - (b.end - b.start))
				.sort((a, b) => a.start - b.start)

			// [5.0] Select Keywords
			newClips = newClips.map(selectKeywords)
			setClips(newClips)

			// [6.0] Get Keyword Trends
			selectTrends(newClips)
		} else if (results?.status === 'queued' || results?.status === 'processing') {
			setIsProcessing(true)
			const currentTime = new Date().getTime()
			const { start, end } = JSON.parse(localStorage.getItem(results.id))
			setPercentAnalyzed(Math.min(((currentTime - start) / (end - start)) * 100, 99.99).toFixed(2) + '% Analyzed')
		}
	}

	function selectKeywords(clip) {
		let clipKeywords = {}

		if (results?.auto_highlights_result?.status === 'success') {
			results.auto_highlights_result.results.forEach(({ text, timestamps }) => {
				text = text.toLowerCase()

				timestamps.forEach(({ start, end }) => {
					if (start >= clip.start && end <= clip.end) {
						if (text in clipKeywords) clipKeywords[text].count += 1
						else clipKeywords[text] = { count: 1, start }
					}
				})
			})
		}

		results?.entities?.forEach(({ start, end, text }) => {
			text = text.toLowerCase()

			if (start >= clip.start && end <= clip.end) {
				if (text in clipKeywords) clipKeywords[text].count += 1
				else clipKeywords[text] = { count: 1, start }
			}
		})

		clip.keywords = Object.entries(clipKeywords)
			.sort((a, b) => a[1].start - b[1].start)
			.sort((a, b) => b[1].count - a[1].count)
			.slice(0, 10)

		return clip
	}

	async function selectTrends(newClips) {
		// [0.0] If Posible, Get Trends from Local Storage
		const storedTrends = JSON.parse(localStorage.getItem(`Trends-${fileId}`))
		if (storedTrends && Date.now() < storedTrends.expiration) {
			setTrends(storedTrends.trends)
			return
		}

		// [1.0] Remove Duplicate Keywords
		let clipsKeywords = {}
		newClips.forEach(({ keywords }) => keywords.forEach(([keyword]) => (clipsKeywords[keyword] = 1)))

		// [2.0] Divide Keywords Into Groups of 100
		let clipsArray = []
		for (let i = 0; i < Object.keys(clipsKeywords).length; i += 100) {
			clipsArray.push(Object.keys(clipsKeywords).slice(i, i + 100))
		}

		// [3.0] Get Trends for Each keyword
		const newTrendsArrays = await Promise.all(clipsArray.map(getTrends))

		// [4.0] Format Trends into an Object
		let newTrends = {}
		newTrendsArrays.forEach(newTrendsArray => newTrendsArray.forEach(trend => (newTrends[trend.keyword] = trend)))

		// [5.0] Save Trends to Local Storage and Update State
		localStorage.setItem(`Trends-${fileId}`, JSON.stringify({ expiration: Date.now() + 86400000, trends: newTrends }))
		setTrends(newTrends)
	}

	async function getTrends(clipsArray) {
		return await axios
			.request({
				data: clipsArray,
				method: 'POST',
				url: `https://leano.ai/v2/trends?i=${fileId}`
			})
			.then(({ data }) => data)
			.catch(alert)
	}

	return !isProcessing ? (
		<div className='Clips' id='clips'>
			<Filters clips={clips} setClips={setClips} />
			{results &&
				results?.words &&
				clips?.map(({ end, keywords, start, text }, index) => (
					<Clip
						end={end}
						file={file}
						formatDuration={formatDuration}
						formatTime={formatTime}
						formatTimeFFMPEG={formatTimeFFMPEG}
						key={`Clip ${start}-${end}`}
						keywords={keywords}
						index={index + 1}
						setClipToEdit={setClipToEdit}
						setFile={setFile}
						setShowEditor={setShowEditor}
						start={start}
						transcript={text}
						trends={trends}
						words={results.words}
					/>
				))}
			{isLoading && <div className='Loading Pulse'>Loading</div>}
			{showEditor && <Editor clipToEdit={clipToEdit} results={results} setShowEditor={setShowEditor} />}
		</div>
	) : (
		<div className='ClipsProcessing'>
			<div className='NewForm NewFormWrapper'>
				<form onSubmit={null}>
					<div className='Title'>Upload New File</div>
					<div>Step 1: Format File</div>
					<input disabled value='100.00% Formatted' />
					<div>Step 2: Upload File</div>
					<input disabled value='100.00% Uploaded' />
					<div>Step 3: Analyze File</div>
					<input className='Pulse' disabled value={percentAnalyzed} />
				</form>
			</div>
		</div>
	)
}
