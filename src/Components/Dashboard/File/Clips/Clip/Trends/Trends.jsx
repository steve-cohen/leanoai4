import { useState } from 'react'
import './Trends.css'

function median(array) {
	const mid = Math.floor(array.length / 2)
	const nums = [...array].sort((a, b) => a - b)
	return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}

export default function Trends({ keywords, trends }) {
	function renderKeywords() {
		if (keywords && trends) {
			const sortedKeywords = keywords.sort((a, b) => trends[b[0]].vol - trends[a[0]].vol)

			return sortedKeywords.map(([keyword, clip]) => (
				<tr key={`Keyword ${keyword}`}>
					<td className='Keyword'>{keyword}</td>
					<td>{trends[keyword].vol.toLocaleString()}</td>
					<td>{clip.count}</td>
				</tr>
			))
		}
	}

	function renderTrendingScore() {
		if (keywords && trends) {
			const searchVolumes = []

			keywords.map(([keyword, clip]) => {
				for (let i = 0; i < clip.count; i++) {
					if (keyword in trends) searchVolumes.push(trends[keyword].vol)
					// else console.log(keyword, trends)
				}
			})

			if (searchVolumes.length) {
				return `${median(searchVolumes).toLocaleString()} Average Search Volume (Last 24 Hours)`
			} else {
				return '0 SEO SCORE'
			}
		}
	}

	return keywords?.length ? (
		<table className='Trends'>
			<thead>
				<tr>
					<th className='Score' colSpan={3}>
						{renderTrendingScore()}
					</th>
				</tr>
				<tr>
					<th className='Keyword'>Keyword</th>
					<th>Search Volume</th>
					<th>Count</th>
				</tr>
			</thead>
			<tbody>
				{renderKeywords()}
				{/* {keywords?.map(([keyword, clip]) => (
					<tr key={`Keyword ${keyword}`}>
						<td className='Keyword'>{keyword}</td>
						<td>{trends?.[keyword]?.vol.toLocaleString()}</td>
						<td>{clip.count}</td>
					</tr>
				))} */}
			</tbody>
		</table>
	) : null
}
