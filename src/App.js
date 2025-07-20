import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Courses from './pages/Courses/Courses.jsx';
import AboutMe from './pages/AboutMe/AboutMe.jsx';

import './App.css';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/aboutme" element={<AboutMe/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

