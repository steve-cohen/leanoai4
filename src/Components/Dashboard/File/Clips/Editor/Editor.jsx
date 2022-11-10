import { useEffect, useRef, useState } from 'react'
import './Editor.css'

export default function Editor({ clipToEdit, setShowEditor, results }) {
	const highlightRef = useRef()
	const transcriptRef = useRef()

	const [endOffset, setEndOffset] = useState()
	const [isHighlighting, setIsHighlighting] = useState(false)
	const [startOffset, setStartOffset] = useState()

	useEffect(() => {
		highlightRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [clipToEdit])

	function getSelectedText() {
		let selectedText = ''
		if (window.getSelection) selectedText = window.getSelection()
		else if (document.getSelection) selectedText = document.getSelection()
		else if (document.selection) selectedText = document.selection.createRange().text

		if (selectedText?.type === 'Range') {
			setStartOffset(Math.min(selectedText.anchorOffset, selectedText.focusOffset))
			setEndOffset(Math.max(selectedText.anchorOffset, selectedText.focusOffset))
			setIsHighlighting(false)
		}
	}

	function renderHighlightedTranscript() {
		let currentSpeaker = 'A'
		let beforeHighlightedText = ''
		let highlightedText = ''
		let afterHighlightedText = ''

		if (startOffset && endOffset) {
			let characterOffset = 0
			results?.words?.forEach(({ speaker, text }) => {
				let displayText = `${text} `
				if (speaker !== currentSpeaker) {
					displayText = `\n\n${text} `
					currentSpeaker = speaker
				}

				const startCharacter = characterOffset
				const endCharacter = characterOffset + displayText.length
				const startHighlight = startOffset
				const endHighlight = endOffset

				if (endCharacter - 1 <= startHighlight) beforeHighlightedText += displayText
				else if (endCharacter - 1 > startHighlight && startCharacter < endHighlight) highlightedText += displayText
				else afterHighlightedText += displayText

				characterOffset += displayText.length
			})
		} else {
			results?.words?.forEach(({ start, end, speaker, text }) => {
				if (speaker === currentSpeaker) {
					text = `${text} `
				} else {
					text = `\n\n${text} `
					currentSpeaker = speaker
				}

				if (start < clipToEdit.start) beforeHighlightedText += text
				else if (start >= clipToEdit.start && end <= clipToEdit.end) highlightedText += text
				else if (end > clipToEdit.end) afterHighlightedText += text
			})
		}

		return (
			<div className='FullTranscript' ref={transcriptRef}>
				{beforeHighlightedText}
				<span className='Highlight' ref={highlightRef}>
					{highlightedText}
				</span>
				{afterHighlightedText}
			</div>
		)
	}

	function renderUnHighlightedTranscript() {
		let currentSpeaker = 'A'
		let transcript = ''

		results?.words?.forEach(({ speaker, text }) => {
			if (speaker === currentSpeaker) {
				transcript += `${text} `
			} else {
				transcript += `\n\n${text} `
				currentSpeaker = speaker
			}
		})

		return (
			<div className='FullTranscript' ref={transcriptRef}>
				{transcript}
			</div>
		)
	}

	return (
		<>
			<div className='EditorBackground' onClick={() => setShowEditor(false)} />
			{results?.words && clipToEdit && (
				<div className='Editor' onMouseDown={() => setIsHighlighting(true)} onMouseUp={() => getSelectedText()}>
					<div className='HeaderWrapper'>
						<div className='Header'>
							<div className='Title'>Edit Your Clip</div>
							<div>
								<span className='Button' onClick={() => setShowEditor(false)}>
									Close
								</span>
								<span className='Button' onClick={() => setShowEditor(false)}>
									Save Edits
								</span>
							</div>
						</div>
						<div className='SubHeader'>Highlight the text you want in your clip, then click Save Edits</div>
					</div>
					{isHighlighting ? renderUnHighlightedTranscript() : renderHighlightedTranscript()}
				</div>
			)}
		</>
	)
}
