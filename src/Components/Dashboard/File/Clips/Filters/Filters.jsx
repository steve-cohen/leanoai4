import { useEffect, useState } from 'react'
import './Filters.css'

export default function Filters({ clips, setClips }) {
	// const [minDuration, setMinDuration] = useState(30)
	// const [maxDuration, setMaxDuration] = useState(120)
	const [showSort, setShowSort] = useState(false)
	const [sort, setSort] = useState('Sort by Start')
	const [sortDirection, setSortDirection] = useState('Ascending')

	function handleSort(newSort, newSortDirection = sortDirection) {
		setShowSort(false)

		let newClips = JSON.parse(JSON.stringify(clips))

		switch (`${newSort} ${newSortDirection}`) {
			case 'Sort by Start Ascending':
				newClips = newClips.sort((a, b) => a.start - b.start)
				break
			case 'Sort by Start Descending':
				newClips = newClips.sort((a, b) => b.start - a.end)
				break
			case 'Sort by End Ascending':
				newClips = newClips.sort((a, b) => b.end - a.end)
				break
			case 'Sort by End Descending':
				newClips = newClips.sort((a, b) => a.end - b.end)
				break
			case 'Sort by Duration Ascending':
				newClips.sort((a, b) => a.end - a.start - b.end - b.start)
				break
			case 'Sort by Duration Descending':
				newClips = newClips.sort((a, b) => b.end - b.start - a.end - a.start)
				break
		}

		setClips(newClips)
		setSort(newSort)
	}

	function handleSortDirection() {
		const newSortDirection = sortDirection === 'Ascending' ? 'Descending' : 'Ascending'
		handleSort(sort, newSortDirection)
		setSortDirection(newSortDirection)
	}

	return (
		<div className='Filters'>
			<span className='Sort'>
				<span className='Label'>
					<span onClick={() => setShowSort(!showSort)}>{sort}</span>
					<svg
						onClick={() => handleSortDirection()}
						style={sortDirection === 'Descending' ? { transform: 'scaleY(-1)' } : {}}
						viewBox='0 0 512 512'
					>
						<path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
					</svg>
				</span>
				{showSort && (
					<div className='ShowSort'>
						<div onClick={() => handleSort('Sort by Start')}>Sort by Start</div>
						<div onClick={() => handleSort('Sort by End')}>Sort by End</div>
						<div onClick={() => handleSort('Sort by Duration')}>Sort by Duration</div>
						{/* <div onClick={() => handleSort('Sort by SEO')}>Sort by SEO</div> */}
					</div>
				)}
			</span>
			{/* <span className='Duration'>
				<span className='Label'>
					Filter by Duration ({minDuration}s - {maxDuration}s)
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
						<path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
					</svg>
				</span>
			</span> */}
		</div>
	)
}
