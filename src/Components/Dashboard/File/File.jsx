import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Categories from './Categories/Categories'
import Clips from './Clips/Clips'
import Warnings from './Warnings/Warnings'
import Transcript from './Transcript/Transcript'

import './File.css'

function formatTime(milliseconds) {
	let time = new Date(milliseconds).toISOString()

	if (milliseconds < 600000) return time.slice(15, 19)
	if (milliseconds < 3600000) return time.slice(14, 19)
	if (milliseconds < 36000000) return time.slice(12, 19)
	return time.slice(11, 19)
}

export default function File({ file, setFile }) {
	let { fileId } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [results, setResults] = useState()
	const [transcript, setTranscript] = useState()

	const resultsRef = useRef()
	resultsRef.current = results

	useEffect(() => {
		if (fileId) {
			setIsLoading(true)
			setResults()
			poll()

			const timer = setInterval(() => {
				if (resultsRef.current && resultsRef.current.status === 'completed') {
					setIsLoading(false)
					clearInterval(timer)
				} else if (resultsRef.current && resultsRef.current.status === 'error') {
					setIsLoading(false)
					clearInterval(timer)
					alert(resultsRef.current.error)
				} else {
					poll()
				}
			}, 5000)

			return () => clearInterval(timer)
		}
	}, [fileId])

	function poll() {
		console.log('Poll')
		setTranscript()
		axios
			.request({ url: `https://leano.ai/v2/transcript/${fileId}` })
			.then(({ data }) => {
				setResults(data)

				if (data.status === 'completed') {
					axios
						.request({ url: `https://leano.ai/v2/transcript/${fileId}/paragraphs` })
						.then(({ data }) => setTranscript(data))
						.catch(alert)
				}
			})
			.catch(alert)
	}

	return (
		<div className='File'>
			<Clips file={file} formatTime={formatTime} isLoading={isLoading} results={results} setFile={setFile} />
			{/* <Warnings formatTime={formatTime} results={results} />
			<Transcript transcript={transcript} />
			<Categories formatTime={formatTime} results={results} /> */}
		</div>
	)
}
