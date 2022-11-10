import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import './Settings.css'

export default function Settings() {
	const navigate = useNavigate()
	const { logout, user } = useAuth0()
	const [isLoading, setIsLoading] = useState(false)

	async function handleBillingPlan() {
		setIsLoading(true)
		const subscription = await axios
			.get(`https://leano.ai/v2/subscriptions?id=${user.sub.replace('auth0|', '')}`)
			.then(({ data }) => data)
			.catch(console.error)
		setIsLoading(false)

		if (subscription?.Item?.customer) {
			let url = `https://leano.ai/v2/stripe/billingportal`
			url += `?c=${subscription.Item.customer}`
			url += `&u=${user.sub.replace('auth0|', '')}`
			if (process.env.NODE_ENV === 'development') url += '&dev=true'
			window.open(url)
		} else {
			navigate('/dashboard/pricing')
		}
	}
	return (
		<div className='Settings NewForm NewFormWrapper'>
			<form onSubmit={null}>
				<div className='Title'>Settings</div>
				<div />
				{isLoading ? (
					<input className='Pulse' value='Loading' />
				) : (
					<input onClick={handleBillingPlan} value='Change Your Billing Plan' />
				)}
				<div />
				<input onClick={() => logout()} value='Sign Out' />
			</form>
		</div>
	)
}
