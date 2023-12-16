import { useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
// import Home from './views/Home.jsx'
import Test from './views/TestView.jsx'
import ConnectFourTestView from './views/ConnectFourTestView.jsx'
// import Update from './views/Update.jsx'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Test/>}></Route>
        <Route path='/connect-four' element={<ConnectFourTestView />}></Route>
      </Routes>
    </>
  )
}

export default App
