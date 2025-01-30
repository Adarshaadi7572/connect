import { useState } from 'react'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Maincontainer from './components/Maincontainer';
import Home from './components/Home';
import Otp from './components/Otp';
import UserContainer from './components/UserContainer';
import Admin from './components/Admin';
import Profile from './components/Profile';
import Post from './components/Post';

import Form1 from './components/Form1'
import Form2 from './components/Form2'
import Form3 from './components/Form3'
import Form4 from './components/Form4'
import Form5 from './components/Form5'
function App() {
  console.log("app component re-renders")
  
  return (
    <div className='App'>
           <Navbar/>
           <Routes>
             <Route path='/' element={<Maincontainer/>}>
                 <Route index element={<Home/>}/>
                 <Route path='login' element={<Login/>}/>
                 <Route path='signup' element={<SignUp/>}/>
                 <Route path='otp' element={<Otp/>}/>
                 <Route path='welcome' element={<UserContainer/>}/>
                 <Route path='profile/:id' element={<Profile/>}>
                    <Route path='details' element={<Form1/>}/>
                    <Route path='education' element={<Form2/>}/>
                    <Route path='projectDetails' element={<Form3/>}/>
                    <Route path='volunteer' element={<Form3/>}/>
                    <Route path='skills' element={<Form5/>}/>
                 </Route>
                 <Route path='post/:id' element={<Post/>}/>
                 
             </Route>
              <Route path ='/admin' element = {<Admin/>}/>
           </Routes>
    </div>
  )
}

export default App
