import { useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import ConnectForm from './views/ConnectForm.jsx';
import ConnectFourTestView from './views/ConnectFourTestView.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<ConnectForm/>}></Route>
        <Route path='/connect-four' element={<ConnectFourTestView />}></Route>
      </Routes>
    </>
  )
}

export default App
