import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './NavigationDesktop.css'

export default function Navigation({ setFile, transcriptions }) {
	const { fileId } = useParams()
	const { hash } = useLocation()
	const navigate = useNavigate()

	function handlePastFile(transcriptId) {
		if (transcriptId !== fileId) setFile()
		navigate(`/dashboard/file/${transcriptId}`)
	}

	return (
		<div className='Navigation'>
			<div className='ToUpload Blue' onClick={() => navigate('/dashboard/upload')}>
				+ Upload New File
			</div>
			<div className='PastFiles'>
				{transcriptions?.map(({ filename, transcriptId }) => (
					<div key={`PastFile ${transcriptId}`}>
						<div
							className={fileId === `${transcriptId}${hash}` ? 'PastFileSelected' : 'PastFile'}
							onClick={() => handlePastFile(transcriptId)}
						>
							{filename}
						</div>
						{/* {fileId === transcriptId && (
							<div className='Sections'>
								<div
									className={hash === '#clips' ? 'PastFileSelected' : 'PastFile'}
									onClick={() => navigate(`/dashboard/file/${transcriptId}#clips`)}
								>
									Clips
								</div>
								<div
									className={hash === '#warnings' ? 'PastFileSelected' : 'PastFile'}
									onClick={() => navigate(`/dashboard/file/${transcriptId}#warnings`)}
								>
									Warnings
								</div>
								<div
									className={hash === '#transcript' ? 'PastFileSelected' : 'PastFile'}
									onClick={() => navigate(`/dashboard/file/${transcriptId}#transcript`)}
								>
									Transcript
								</div>
								<div
									className={hash === '#categories' ? 'PastFileSelected' : 'PastFile'}
									onClick={() => navigate(`/dashboard/file/${transcriptId}#categories`)}
								>
									Categories
								</div>
							</div>
						)} */}
					</div>
				))}
			</div>
			<div className='Settings Blue' onClick={() => navigate('/dashboard/settings')}>
				<div>Settings</div>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
					<path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
				</svg>
			</div>
		</div>
	)
}
