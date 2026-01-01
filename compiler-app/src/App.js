import logo from './logo.svg';
import './App.css';
import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

function App() {
	const [code, setCode] = useState("# Start Coding");
	const [language, setLanguage] = useState("python"); // Default language

	const submitCode = async () => {
		// API logic goes in here
		console.log(code);
		// Try to limit the number of API calls to amazon link because of free plan
		/*try{
			const answer = await fetch("https://1gah1dspf6.execute-api.us-east-1.amazonaws.com/production",{
				headers: {
					"Content-Type": "application/json",

				},
				method: "POST",
				body: JSON.stringify({
					code: code,
					language: language
			})
			});

			const response = await answer.json();

			console.log(response);
		}
		catch (e)
		{
			console.log(e.message);
		}*/
  	};

	return (
		<div className="App">
	  	<button style={{background:language === 'python' ? 'black' : 'white', color:language === 'python' ? 'white' : 'black'}} onClick={() => {
			setLanguage("python");
	  	}}>
		Python
	  	</button>

	  	<button style={{background:language === 'java' ? 'black' : 'white', color:language === 'java' ? 'white' : 'black'}} onClick={() => {
			setLanguage("java");
	  	}}>
		Java
	  	</button>

	  	<button style={{background:language === 'cpp' ? 'black' : 'white', color:language === 'cpp' ? 'white' : 'black'}} onClick={() => {
			setLanguage("cpp");
	  	}}>
		C++
	  	</button>

	  	<button onClick={() => {
			submitCode();
	  	}}>
		Compile
	  	</button>

		<Editor 
			onChange={(e) => {
				setCode(e);
			}}
			value={code}
			theme="vs-dark"
			height="90vh" 
			defaultLanguage="python" 
			defaultValue="# Start Coding" 
		/>
		</div>
	);
}

export default App;
