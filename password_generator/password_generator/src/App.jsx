import { useCallback, useEffect, useRef, useState } from "react";

function App() {
    const [length, setLength] = useState(8)
    const [numAllowed, setNumAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")
    const PasswordRef = useRef()

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(password)
        PasswordRef?.current.select()
    }

    const passwordGenerator = useCallback(()=>{
        let pass = ""
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

        if(numAllowed) 
            str += "0123456789"
        if(charAllowed)
            str += "!@#$%^&*()_+~`|}{[]:;?><,./-="

        for (let i = 0; i < length; i++) {
            let index = Math.floor(Math.random() * str.length)
            pass += str.charAt(index)        
        }

        setPassword(pass)
    }, [length,numAllowed,charAllowed,setPassword])

    useEffect(()=> {
        passwordGenerator()
    }, [length,numAllowed,charAllowed,setPassword])

  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen p-6 m-6">
        
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          Password Generator
        </h1>

        {/* Password Output & Button */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg max-w-xl mx-auto">
          <input
            type="text"
            ref = {PasswordRef}
            value = {password}
            placeholder="Your password"
            id="_password"
            onChange={(e) => {setPassword(e.target.value)}}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform cursor-pointer"
          onClick={copyToClipBoard}
          >
            Copy Text
          </button>
        </div>

        {/* Settings: Length, Characters, Numbers */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-4">
          {/* Length Range */}
          <div className="flex flex-col">
            <label htmlFor="length" className="mb-1 font-semibold">
              Password Length : {length}
            </label>
            <input
              type="range"
              id="length"
              value={length}
              min="6"
              max="100"
              onChange={(e) => {setLength(e.target.value)}}
              className="accent-purple-500 hover:cursor-pointer"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 font-medium">
              <input type="checkbox" defaultChecked = {charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}/>
              Characters
            </label>

            <label className="flex items-center gap-2 font-medium">
              <input type="checkbox" defaultChecked = {numAllowed} 
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}/>
              Numbers
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
