import {React, useState, useEffect} from "react";
import axios from "axios";
import '../styles/events.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 
import {Link} from "react-router-dom";


const Friends = ({currentUser, setCurrentUser}) => {
	const [users, setUsers] = useState([]);

	function fetchUsers() {
		axios({
            url: "http://localhost:5001/users",
            method: "GET",
        })
            .then((res) => {
            	setUsers(res.data);
            });
	}

	useEffect(() => {
        axios.post('http://localhost:5001/user', {user : currentUser}).then((res) => {
            setCurrentUser(res.data);
        });
    }, []);

	useEffect(fetchUsers,[]);

	var selectedUsers = users.filter(user => user._id != currentUser._id)
								.map(value => ({ value, sort: Math.random() }))
    							.sort((a, b) => a.sort - b.sort)
    							.map(({ value }) => value);


    function addFriend(event, new_friend) {
    	if (event.target.classList.contains("add")) {
    		event.target.classList.remove("add")
    		event.target.innerHTML = "Remove Friend";
    	} else {
    		event.target.classList.add("add")
    		event.target.innerHTML = "Add Friend";
    	}
    	axios.post('http://localhost:5001/friend', { user : currentUser._id, new_friend : new_friend}).then((res) => {
	    });
    	
    }


    return (
    	<>
    		<div style = {{display: "flex", justifyContent:"center", marginTop: "2vh"}}>
				<h1 class="text-white" style={{marginBottom:"3vh", fontWeight : "bold"}}>Your Event Mates</h1>
			</div>
	    	<div style={{overflowY : "scroll", height: "80vh"}}>
		        <div class="container-fluid min-vh-100 bg-light-grey p-4 d-flex" >
		        	<ul className="list-group w-100 d-flex" >
		                {selectedUsers.length === 0 ? 
		                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', color: 'white'}}>
		                    No other users.
		                    </div> : 
		                    selectedUsers.map((user) => (
		                        <li key={user._id} className="list-group-item bg-secondary text-light border-0" style={{width: "100%"}}>
		                        <b>{user.name}</b> 
		                        <i style={{ color: 'gray'}}>{user.bio}</i>
		                        	{ currentUser.friends.includes(user._id) ? 
		                        		<button class="toggleFriend" onClick = {(event) => addFriend(event, user._id)}>Remove Friend</button>
		                        		:
		                        		<button class="toggleFriend add" onClick = {(event) => addFriend(event, user._id)}>Add Friend</button>
		                        	}
		                        </li>
		                    ))
		                }
		            </ul>
		        </div>
	        </div>
        </>
    )
}

export default Friends;