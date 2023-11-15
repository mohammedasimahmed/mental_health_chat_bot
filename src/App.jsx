import './App.css'
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChatComponent from './components/ChatComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<ChatComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
