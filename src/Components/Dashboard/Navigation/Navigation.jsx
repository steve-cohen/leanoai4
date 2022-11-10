import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import NavigationDesktop from './NavigationDesktop/NavigationDesktop'
import NavigationMobile from './NavigationMobile/NavigationMobile'

export default function Navigation2({ setFile }) {
	const { user } = useAuth0()
	const [transcriptions, setTranscriptions] = useState([])
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	useEffect(() => {
		axios
			.get(`https://leano.ai/v2/transcriptions?u=${user.sub.replace('auth0|', '')}`)
			.then(({ data }) => setTranscriptions(data.Items))
			.catch(alert)

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	function handleResize() {
		setWindowWidth(window.innerWidth)
	}

	return windowWidth > 600 ? (
		<NavigationDesktop setFile={setFile} transcriptions={transcriptions} />
	) : (
		<NavigationMobile setFile={setFile} transcriptions={transcriptions} />
	)
}
