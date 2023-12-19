import { useState } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
import ConnectForm from './components/ConnectForm.jsx';
import ConnectFourTestView from './views/ConnectFourTestView.jsx';
import io from 'socket.io-client'


function App() {
  const [socket] = useState(() => io(":8000"));

  return (
    <>
      <div class="nav-bar space-between">
        <h1>Connect<span>Four</span></h1>
        <div class="nav-items flex">
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path='/' element={<ConnectForm socket={socket}/>}></Route>
          <Route path='/connect-four/:userName/:room' element={<ConnectFourTestView socket={socket}/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
