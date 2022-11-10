import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Transcript.css'

export default function Transcript({ transcript }) {
	let { fileId } = useParams()
	const [paragraphs, setParagraphs] = useState()

	useEffect(() => {
		if (transcript) createParagraphs()
		else setParagraphs()
	}, [transcript])

	function createParagraphs() {
		// [1.0] Create Paragraphs
		let currentSpeaker = 'A'
		let newParagraph = []
		let newParagraphs = []

		transcript.paragraphs.forEach(({ words }, index) => {
			words.forEach(word => {
				if (word.speaker === currentSpeaker) {
					newParagraph.push(word)
				} else {
					if (newParagraph.length) newParagraphs.push(newParagraph)
					newParagraph = [word]
					currentSpeaker = word.speaker
				}
			})

			if (!newParagraph[newParagraph.length - 1].text.includes('\n\n')) {
				newParagraph[newParagraph.length - 1].text += '\n\n'
			}
			if (index === transcript.paragraphs.length - 1) newParagraphs.push(newParagraph)
		})

		// [2.0] Remove Trailing Line Breaks
		newParagraphs = newParagraphs.map(newParagraph => {
			newParagraph[newParagraph.length - 1].text = newParagraph[newParagraph.length - 1].text.replace(/\n/g, '')
			return newParagraph
		})

		setParagraphs(newParagraphs)
	}

	async function handleDownload(fileType) {
		const fileContent = await fetch(`https://leano.ai/v2/transcript/${fileId}/${fileType}`).then(response =>
			response.text()
		)
		const blob = new Blob([fileContent], { type: 'text/plain' })
		const a = document.createElement('a')
		a.setAttribute('download', `transcript.${fileType}`)
		a.setAttribute('href', window.URL.createObjectURL(blob))
		a.click()
		document.body.removeChild(a)
	}

	return (
		<div className='Transcript' id='transcript'>
			<div className='Head'>
				<div className='Title'>Transcript</div>
				<div className='Buttons'>
					<span onClick={() => handleDownload('srt')}>.SRT</span>
					<span onClick={() => handleDownload('vtt')}>.VTT</span>
				</div>
			</div>
			<table>
				<tbody>
					{paragraphs?.map((paragraph, index) => (
						<tr
							className='Paragraph'
							key={`Paragraph ${index}`}
							style={index % 2 ? { backgroundColor: 'rgb(244, 247, 250)' } : {}}
						>
							<td className='Bold'>Speaker {paragraph[0].speaker}: </td>
							<td className='Paragraph Break'>{paragraph.map(({ text }) => `${text} `)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
