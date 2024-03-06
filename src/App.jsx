import { useState,useCallback ,useEffect,useRef} from 'react'
import './App.css'
function App() {
  const [length,setLength]=useState(8);
  const [number,setNumber]=useState(false);
  const [char,setChar]=useState(false);
  const [password,setPassword]=useState("");


  // useRef hook

  const passwordref=useRef(null)
  const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(number) str+="0123456789"
if(char) str+="!@$%^&*_-+={}[]~`"
for (let i = 1; i <= length; i++){
  let  character=Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(character)
}
setPassword(pass) 
  },[length,number,char]) //optimization


const copypasswordtoclip=useCallback(()=>{
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,99);
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,char,passwordGenerator])
  return (   //if koi chedchad h to dobara se run krdo
  
       <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-4
       my-8 text-orange-500 bg-gray-800'
       >
        <h1 className='text-white text-center my-3'>Password Gen</h1>
       <div className='className="flex shadow rounded-sm overflow-hidden mb-4" '>
       <input 
       type="text"
       value={password}
       className='outline-none w-full py-1 px-3'
       placeholder='password'
       readOnly
       ref={passwordref}
       />
       <button 
       onClick={copypasswordtoclip}
       className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
       </div>
       <div className='flex text-sm gap-x-2' >
        <div className='flex items-center gap-x-1'>
          <input
           type="range"
           min={6}
           max={100}
           value={length}
           className='cursor-pointer'
           onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>
            length:{length}
           </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={()=>{
            setNumber((prev)=> !prev);
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={char}
          id="characterInput"
          onChange={()=>{
        setChar((prev)=> !prev);
     }}
          />
          <label htmlFor="characterInput">Characters</label>
       </div>
       </div>
       </div>
       
)}
export default App
