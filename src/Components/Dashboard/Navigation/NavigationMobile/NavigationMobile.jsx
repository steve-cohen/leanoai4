import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './NavigationMobile.css'

export default function NavigationMobile({ setFile, transcriptions }) {
	const { fileId } = useParams()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const [label, setLabel] = useState()
	const [value, setValue] = useState()

	useEffect(() => {
		if (pathname === '/dashboard/settings') {
			setLabel('settings')
			setValue('settings')
		} else if (pathname === '/dashboard/upload') {
			setLabel('upload')
			setValue('upload')
		} else {
			let fileIds = {}
			transcriptions?.forEach(({ filename, transcriptId }) => (fileIds[transcriptId] = filename))
			if (fileId in fileIds) {
				setLabel(fileIds[fileId])
				setValue(fileId)
			}
		}
	}, [pathname, transcriptions])

	function handleSelect(newOption) {
		if (newOption === 'settings') navigate('/dashboard/settings')
		else if (newOption === 'upload') navigate('/dashboard/upload')
		else if (newOption) {
			if (newOption !== fileId) setFile()
			navigate(`/dashboard/file/${newOption}`)
		}
	}

	return (
		<div className='NavigationMobile'>
			{label && (
				<label>
					<span>{label}</span>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
						<path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
					</svg>
				</label>
			)}
			<select onChange={e => handleSelect(e.target.value)} value={value}>
				<option value='upload'>Upload</option>
				<option value='settings'>Settings</option>
				{transcriptions?.map(({ filename, transcriptId }) => (
					<option key={`Navigation Transcript ${transcriptId}`} value={transcriptId}>
						{filename}
					</option>
				))}
			</select>
		</div>
	)
}
