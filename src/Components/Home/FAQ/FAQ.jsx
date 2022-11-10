const faqs = [
	{
		question: 'How does it work?',
		answer: `Upload your raw file, let Leano AI analyze it, then download clips.`
	},
	{
		question: 'Can I see a demo?',
		answer: (
			<>
				<a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
					Watch a recording
				</a>
				<span> or </span>
				<a href='#contact' className='font-medium text-indigo-600 hover:text-indigo-500'>
					schedule a walkthrough
				</a>
				<span>.</span>
			</>
		)
	},
	{
		question: 'What if I need more than 30 hours per month?',
		answer: (
			<>
				<a href='#contact' className='font-medium text-indigo-600 hover:text-indigo-500'>
					Contact support
				</a>
				<span>. Enterprise plans are available.</span>
			</>
		)
	},
	{
		question: 'Which file types do you accept?',
		answer:
			'.3ga, .8svx, .aac, .ac3, .aif, .aiff, .alac, .amr, .ape, .au, .dss, .flac, .flv, .M2TS, .m4a, .m4b, .m4p, .m4r, .m4v, .mp2, .mp3, .mp4, .mpga, .mov, .MTS, .mxf, .ogg, .oga, .mogg, .opus, .qcp, .tta, .TS, .voc, .wav, .wma, .wv, .webm'
	},
	{
		question: 'What is the maximum file length?',
		answer: '10 hours per file.'
	},
	{
		question: 'When are SEO rankings updated?',
		answer: 'Every 24 Hours.'
	}
]

export default function FAQ() {
	return (
		<div className='bg-white' id='faq'>
			<div className='mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8'>
				<div className='lg:grid lg:grid-cols-3 lg:gap-8'>
					<div>
						<h2 className='text-3xl font-bold tracking-tight text-gray-900'>Frequently asked questions</h2>
						<p className='mt-4 text-lg text-gray-500'>
							Can't find the answer you're looking for? Reach out to our{' '}
							<a href='#contact' className='font-medium text-indigo-600 hover:text-indigo-500'>
								customer support
							</a>{' '}
							team.
						</p>
					</div>
					<div className='mt-12 lg:col-span-2 lg:mt-0'>
						<dl className='space-y-12'>
							{faqs.map(faq => (
								<div key={faq.question}>
									<dt className='text-lg font-medium leading-6 text-gray-900'>{faq.question}</dt>
									<dd className='mt-2 text-base text-gray-500 whitespace-pre-line'>{faq.answer}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</div>
	)
}
