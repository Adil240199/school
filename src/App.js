import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

