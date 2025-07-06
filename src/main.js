import React from 'react'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom';
import {  } from 'react-router-dom';
import Navbar from './navbar'
import {Login_in,Sign_in} from './login_sign_in '
import Share_thought_form from './share_thought_form'
import Jobs from './jobs';
import Duagle from './duagle'
import Network from "./network"
import Profile from './Profile';
export default function Main() {
  return (
    <div>
<Router>
  <Routes>
    <Route path='/'  element={<><Navbar/><Duagle/> </>}/>
    <Route path="/login" element={<Login_in/>}/>
    <Route path='/Sign_in' element={<Sign_in/>}/>
    <Route path="/jobs" element={<Jobs/>}/>
   <Route path="/Your_Network" element={<Network/>}/>
  <Route path="/Post_job" element={<Navbar/>}/>
  <Route path="/Profile" element={<Profile/>}/>
    <Route path="/Your_Network/share_thought" element={<Share_thought_form/>}/>




  </Routes>
</Router>

  
    </div>
  )
}
