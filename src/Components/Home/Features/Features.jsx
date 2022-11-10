import {
	ArrowDownTrayIcon,
	DocumentTextIcon,
	PlayCircleIcon,
	PresentationChartBarIcon,
	PresentationChartLineIcon
} from '@heroicons/react/24/outline'

const clipFeatures = [
	{
		id: 1,
		name: 'Download Clips',
		description: 'Select from dozens of social media clips that are ready to download at a click of a button.',
		icon: ArrowDownTrayIcon
	},
	{
		id: 2,
		name: 'Read Transcripts',
		description:
			'Save time picking the best clips. Read the clip transcriptions instead listening all the way through the original file.',
		icon: DocumentTextIcon
	},
	{
		id: 3,
		name: 'Edit Clips',
		description: `Need to make changes? Simply adjust the start and end of each clip. Create the perfect clip, down to the exact word.`,
		icon: PlayCircleIcon
	}
]

const seoFeatures = [
	{
		id: 1,
		name: 'Clip SEO Scores',
		description:
			'Find clips with the best chance of organic reach. Compare the SEO scores for each clip. Keep up with the latest trends.',
		icon: PresentationChartBarIcon
	},
	{
		id: 2,
		name: 'Keyword SEO Scores',
		description: `Create trending content. See keywords people are currently searching for, as well as the number of times each keyword appears in your clip.`,
		icon: PresentationChartLineIcon
	}
]

export default function Features() {
	return (
		<div className='overflow-hidden py-16 lg:py-24' id='features'>
			<div className='relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
				<svg
					className='absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block'
					width={404}
					height={784}
					fill='none'
					viewBox='0 0 404 784'
					aria-hidden='true'
				>
					<defs>
						<pattern
							id='b1e6e422-73f8-40a6-b5d9-c8586e37e0e7'
							x={0}
							y={0}
							width={20}
							height={20}
							patternUnits='userSpaceOnUse'
						>
							<rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
						</pattern>
					</defs>
					<rect width={404} height={784} fill='url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)' />
				</svg>

				<div className='relative'>
					<h2 className='text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
						A faster way to create short clips
					</h2>
					<p className='mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500'>
						No more manual splicing and cutting. No more listening to entire podcasts. Let AI create dozens of clips,
						then download the best ones.
					</p>
				</div>

				<div className='relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8'>
					<div className='relative'>
						<h3 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Save Hundreds of Hours</h3>
						<p className='mt-3 text-lg text-gray-500'>
							Stop creating clips by hand. Let artificial intelligence transcribe your raw files, then identify clips
							within the conversation. Download dozens of clips and select the best ones for each social media platform.
						</p>

						<dl className='mt-10 space-y-10'>
							{clipFeatures.map(item => (
								<div key={item.id} className='relative'>
									<dt>
										<div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white'>
											<item.icon className='h-6 w-6' aria-hidden='true' />
										</div>
										<p className='ml-16 text-lg font-medium leading-6 text-gray-900'>{item.name}</p>
									</dt>
									<dd className='mt-2 ml-16 text-base text-gray-500'>{item.description}</dd>
								</div>
							))}
						</dl>
					</div>

					<div className='relative -mx-4 mt-10 lg:mt-0' aria-hidden='true'>
						<svg
							className='absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden'
							width={784}
							height={404}
							fill='none'
							viewBox='0 0 784 404'
						>
							<defs>
								<pattern
									id='ca9667ae-9f92-4be7-abcb-9e3d727f2941'
									x={0}
									y={0}
									width={20}
									height={20}
									patternUnits='userSpaceOnUse'
								>
									<rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
								</pattern>
							</defs>
							<rect width={784} height={404} fill='url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)' />
						</svg>
						<img
							className='relative mx-auto p-2 rounded-lg shadow-xl border-solid border border-gray-200'
							width={370}
							src='/Clip.png'
							alt=''
						/>
					</div>
				</div>

				<svg
					className='absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block'
					width={404}
					height={784}
					fill='none'
					viewBox='0 0 404 784'
					aria-hidden='true'
				>
					<defs>
						<pattern
							id='64e643ad-2176-4f86-b3d7-f2c5da3b6a6d'
							x={0}
							y={0}
							width={20}
							height={20}
							patternUnits='userSpaceOnUse'
						>
							<rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
						</pattern>
					</defs>
					<rect width={404} height={784} fill='url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)' />
				</svg>

				<div className='relative mt-12 sm:mt-16 lg:mt-24'>
					<div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8'>
						<div className='lg:col-start-2'>
							<h3 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
								Search Engine Optimization (SEO)
							</h3>
							<p className='mt-3 text-lg text-gray-500'>
								Find clips with the highest search engine optimization scores. Each clip is transcribed and keywords are
								identified. Each clip and keyword is scored based on the search volume in the last 24 hours.
							</p>

							<dl className='mt-10 space-y-10'>
								{seoFeatures.map(item => (
									<div key={item.id} className='relative'>
										<dt>
											<div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white'>
												<item.icon className='h-6 w-6' aria-hidden='true' />
											</div>
											<p className='ml-16 text-lg font-medium leading-6 text-gray-900'>{item.name}</p>
										</dt>
										<dd className='mt-2 ml-16 text-base text-gray-500'>{item.description}</dd>
									</div>
								))}
							</dl>
						</div>

						<div className='relative -mx-4 mt-10 lg:col-start-1 lg:mt-0'>
							<svg
								className='absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden'
								width={784}
								height={404}
								fill='none'
								viewBox='0 0 784 404'
								aria-hidden='true'
							>
								<defs>
									<pattern
										id='e80155a9-dfde-425a-b5ea-1f6fadd20131'
										x={0}
										y={0}
										width={20}
										height={20}
										patternUnits='userSpaceOnUse'
									>
										<rect x={0} y={0} width={4} height={4} className='text-gray-200' fill='currentColor' />
									</pattern>
								</defs>
								<rect width={784} height={404} fill='url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)' />
							</svg>
							<img className='relative mx-auto rounded-xl shadow-lg' width={490} src='./SEO.png' alt='' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
