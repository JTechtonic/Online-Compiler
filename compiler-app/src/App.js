import logo from './logo.svg';
import './App.css';
import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

function App() {
	const [code, setCode] = useState("");
	const [language, setLanguage] = useState("");

  const submitCode = () => {
    // API logic goes in here
    console.log(code);
  };

  // useEffect(() => {
  //   console.log(code);
  // }, [code])

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
				defaultValue="// some comment" 
			/>
		</div>
	);
}

export default App;
