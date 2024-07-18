import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Events from "./pages/events";
import Profile from "./pages/profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  )
};
export default App;