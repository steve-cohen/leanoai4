import './Categories.css'

export default function Categories({ formatTime, results }) {
	function renderCategory({ labels, text, timestamp }, index) {
		let sortedLabels = labels
			.map(({ label }) => label.replace(/>/g, ' > '))
			.sort()
			.join('\n')

		return (
			<tr key={`Category ${index}`} style={index % 2 ? { backgroundColor: 'rgb(244, 247, 250)' } : {}}>
				<td className='Start'>{formatTime(timestamp.start)}</td>
				<td className='End'>{formatTime(timestamp.end)}</td>
				<td className='Labels'>{sortedLabels}</td>
				<td className='Text'>{text}</td>
			</tr>
		)
	}

	return (
		<div className='Categories' id='categories'>
			<div className='Head'>
				<div className='Title'>Categories</div>
			</div>
			<table>
				<thead>
					<tr>
						<th className='Right'>Start</th>
						<th className='Right'>End</th>
						<th>Category</th>
						<th>Excerpt</th>
					</tr>
				</thead>
				<tbody>{results?.iab_categories_result?.results?.map(renderCategory)}</tbody>
			</table>
		</div>
	)
}
