import Contact from './Contact/Contact'
import CTA from './CTA/CTA'
import Features from './Features/Features'
import FAQ from './FAQ/FAQ'
import Footer from './Footer/Footer'
import Hero from './Hero/Hero'
import Pricing from './Pricing/Pricing'
import Testimonial from './Testimonial/Testimonial'
import './Home.css'

export default function Home() {
	return (
		<div className='Home'>
			<Hero />
			<Features />
			<Pricing />
			<Testimonial />
			<FAQ />
			<Contact />
			<CTA />
			<Footer />
		</div>
	)
}
