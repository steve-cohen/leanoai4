import { useState } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

import Audio from './Audio/Audio'
import SelectOriginalFile from './SelectOriginalFile/SelectOriginalFile'
import Trends from './Trends/Trends'
import Video from './Video/Video'

import './Clip.css'

// Multi-Thread
// const ffmpeg = createFFmpeg({ log: process.env.NODE_ENV === 'development' ? true : false })

// Single Thread
const ffmpeg = createFFmpeg({
	corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
	log: process.env.NODE_ENV === 'development' ? true : false,
	mainName: 'main'
})

export default function Clip({
	end,
	file,
	formatDuration,
	formatTime,
	formatTimeFFMPEG,
	index,
	keywords,
	setClipToEdit,
	setFile,
	setShowEditor,
	start,
	transcript,
	trends
}) {
	const [isDownloading, setIsDownloading] = useState(false)
	const [isVisited, setIsVisited] = useState(false)

	async function downloadClip() {
		if (!file) return
		setIsDownloading(true)

		// const clipName = `${index} - ${transcript.slice(0, 50).trim().replace(/\./g, '')}.${file.name.split('.').pop()}`
		const topKeywords = keywords
			.slice(0, 5)
			.map(([keyword]) => keyword)
			.join(', ')
		const clipName = `Clip ${index} - ${topKeywords}.${file.name.split('.').pop()}`

		// Create Clip
		if (!ffmpeg.isLoaded()) await ffmpeg.load()
		ffmpeg.FS('writeFile', file.name, await fetchFile(file))
		await ffmpeg.run(
			'-ss',
			formatTimeFFMPEG(start),
			'-i',
			file.name,
			'-to',
			formatTimeFFMPEG(end - start),
			'-c:v',
			'copy',
			'-c:a',
			'copy',
			clipName
		)
		const newClip = ffmpeg.FS('readFile', clipName)
		ffmpeg.exit()

		// Trigger Download
		const link = document.createElement('a')
		link.href = URL.createObjectURL(new Blob([newClip.buffer], { type: file.type }))
		link.download = clipName
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		setIsDownloading(false)
		setIsVisited(true)
	}

	function handleEditClip() {
		setClipToEdit({ start, end })
		setShowEditor(true)
	}

	function renderPreview() {
		if (file?.type?.includes('video')) return <Video end={end} file={file} formatTime={formatTime} start={start} />
		if (file?.type?.includes('audio')) return <Audio end={end} file={file} formatTime={formatTime} start={start} />
	}

	return (
		<div className='Clip'>
			<div className='Data'>
				<div className='Meta'>
					{file ? (
						<span className='LineBreakOnMobile'>
							<span className={`Download ${isDownloading ? 'Downloading' : ''}`}>
								<button
									disabled={isDownloading}
									onClick={downloadClip}
									style={isVisited ? { color: 'rgb(128, 0, 128)' } : {}}
								>
									{isDownloading ? 'Downloading' : `Download Clip ${index}`}
								</button>
							</span>
							{/* <span className='Edit' onClick={() => handleEditClip()}>
								Edit Clip
							</span> */}
						</span>
					) : (
						<span>
							<span>
								<SelectOriginalFile setFile={setFile} />
							</span>
						</span>
					)}
					<span>
						<span className='Duration'>{formatDuration(end - start)}</span>
						<span>
							{formatTime(start)} - {formatTime(end)}
						</span>
					</span>
				</div>
				<div className='Text'>{transcript}</div>
			</div>
			<div className='Analytics'>
				{file && renderPreview()}
				<Trends keywords={keywords} trends={trends} />
			</div>
		</div>
	)
}
