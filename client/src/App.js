import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Events from "./pages/events";
import CreateEvent from "./pages/create_event";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Login from './pages/login';

const App = () => {
  const [currentUser] = React.useState("testuser"); 
  const [user] = React.useState("testuser"); 

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/events" element={<Events currentUser={currentUser} selectionFunction={(event) => !event.members.includes(currentUser)} />} />
        <Route path="/create-event" element={<CreateEvent currentUser={currentUser} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
