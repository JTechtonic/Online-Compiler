import logo from './logo.svg';
import './App.css';
import Editor from '@monaco-editor/react';
import { useState } from 'react';

function App() {
	const [code, setCode] = useState("");
	const [language, setLanguage] = useState("");


	return (
		<div className="App">
			<Editor 
				height="90vh" 
				defaultLanguage="javascript" 
				defaultValue="// some comment" 
			/>;
		</div>
	);
}

export default App;
