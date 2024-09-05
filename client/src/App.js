import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Events from "./pages/events";
import CreateEvent from "./pages/create_event";
import Profile from "./pages/profile";

const App = () => {
	var [currentUser, setCurrentUser] = React.useState("testuser");

	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home/>} />
				<Route path="/events" element={<Events currentUser={currentUser} selectionFunction = {(event) => !event.members.includes(currentUser)}/>} />
				<Route path="/create-event" element={<CreateEvent currentUser={currentUser}/>} />
				<Route path="/profile" element={<Profile currentUser={currentUser}/>} />
			</Routes>
		</Router>
	)
};
export default App;