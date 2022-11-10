import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Navigation from './Navigation/Navigation'
import './Dashboard.css'

function Dashboard({ setFile }) {
	const { hash } = useLocation()

	useEffect(() => {
		if (hash) document.getElementById(hash.replace('#', '')).scrollIntoView({ behavior: 'smooth' })
	}, [hash])

	return (
		<div className='Dashboard'>
			<Navigation setFile={setFile} />
			<div className='Content'>
				<Outlet />
			</div>
		</div>
	)
}

export default withAuthenticationRequired(Dashboard)
