import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Events from "./pages/events";
import CreateEvent from "./pages/create_event";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Login from './pages/login';

const App = () => {
  // useState returns a list
  // they are not variables, they are objects they are not mutating the objects at all
  // we can set the value of the current user property but we can't change the object itself
  const [currentUser, setCurrentUser] = React.useState(null);
  
  const isAuthenticated = () =>{
    return currentUser !== null;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/events" element={<Events currentUser={currentUser} selectionFunction={(event) => !event.members.includes(currentUser)} />} />
        <Route path="/create-event" element={<CreateEvent currentUser={currentUser} />} />
        <Route path="/profile" element={isAuthenticated() ? <Profile currentUser={currentUser} /> : <Navigate to = "/login"/> }/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setCurrentUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
