import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Dashboard from './Components/Dashboard/Dashboard'
import File from './Components/Dashboard/File/File'
import Home from './Components/Home/Home'
import Pricing from './Components/Dashboard/Pricing/Pricing'
import Settings from './Components/Dashboard/Settings/Settings'
import Upload from './Components/Dashboard/Upload/Upload'

import './App.css'

const version = 'v67.1.3'

export default function App() {
	const [file, setFile] = useState()

	return (
		<div className='App'>
			<Routes>
				<Route path='/dashboard' element={<Dashboard setFile={setFile} />}>
					<Route path='file/:fileId' element={<File file={file} setFile={setFile} />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='settings' element={<Settings />} />
					<Route path='upload' element={<Upload file={file} setFile={setFile} />} />
					<Route path='*' element={<Upload file={file} setFile={setFile} />} />
				</Route>
				<Route path='*' element={<Home version={version} />} />
			</Routes>
		</div>
	)
}
