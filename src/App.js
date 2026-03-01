import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import "./App.css";
import Register from "./components/LoginForm/Register/Register.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import CourseDetail from "./components/CourseDetail/CourseDetail.jsx";
import Admin from "./pages/AdminPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/login/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:level" element={<CourseDetail />} />
            <Route path="/aboutme" element={<AboutMe />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
