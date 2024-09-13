import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import '../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({currentUser, setCurrentUser}) =>{
    const location = useLocation();

    function logOut() {
      setCurrentUser(null);
      window.location.href = "/login";
    }
    return (    
        <nav class="navbar navbar-expand-lg">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class={"nav-item"+(location.pathname=="/profile" ? " active":"")}>
                <Link to="/profile">Profile</Link>
              </li>
              <li class={"nav-item"+(location.pathname=="/events" ? " active":"")}>
                <Link to="/events">Events</Link>
              </li>
              <li class={"nav-item"+(location.pathname=="/create-event" ? " active":"")}>
                <Link to="/create-event">Create Event</Link>
              </li>
            </ul>
          </div>
          {currentUser ? 
            <button onClick = {logOut} class="text-white" style={{textDecoration:"none", border: "none", background:"none"}}>Log Out</button> : 
            ""
          }
          
        </nav>
    )

}

export default NavBar;