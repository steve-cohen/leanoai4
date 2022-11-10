import './Warnings.css'

export default function Warnings({ results, formatTime }) {
	return (
		<div className='Warnings' id='warnings'>
			<div className='Head'>
				<div className='Title'>Content Warnings</div>
			</div>
			<table>
				<thead>
					<tr>
						<th className='Right'>Start</th>
						<th className='Right'>End</th>
						<th>Warning</th>
						<th>Excerpt</th>
					</tr>
				</thead>
				<tbody>
					{results?.content_safety_labels?.results?.map(({ labels, text, timestamp }, index) => (
						<tr key={`Warning ${index}`} style={index % 2 ? { backgroundColor: 'rgb(244, 247, 250)' } : {}}>
							<td className='Start'>{formatTime(timestamp.start)}</td>
							<td className='End'>{formatTime(timestamp.end)}</td>
							<td className='Red Label'>{labels.map(({ label }) => label.replace(/_/g, ' ')).join(', ')}</td>
							<td className='Text'>{text}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div />
		</div>
	)
}
