import { useState } from 'react'
import './App.css'
import { Header } from './cmps/Header.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Permissions } from "./pages/Permissions";
import { ManagementPage } from "./pages/ManagementPage.jsx";
import { NewWork } from './pages/NewWork.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { ShowWork } from './pages/ShowWork.jsx';

function App() {

  return (
    <main className='main-container'>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/managementTable' element={<ManagementPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/permissions' element={<Permissions />}/>
        <Route path='/newWork' element={<NewWork />}/>
        <Route path='/showWork' element={<ShowWork />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>

      </BrowserRouter>
    </main>
  )
}

export default App
