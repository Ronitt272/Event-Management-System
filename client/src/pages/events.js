import {React, useState, useEffect} from "react";
import axios from "axios";
import '../styles/events.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 



const Events = ({currentUser, selectionFunction}) => {
	const [events, setEvents] = useState([]);

	console.log(currentUser)
	function fetchEvents() {
		axios({
            url: "http://localhost:5001/events",
            method: "GET",
        })
            .then((res) => {
            	console.log(res.data)
            	setEvents(res.data);
            })
	}

	useEffect(fetchEvents,[]);

	function showModal(event) {
		document.getElementById("eventModalName").innerHTML = event.name+(event.isPrivate ? '  <i>[Private Event]</i>' : '  <i>[Public Event]</i>')
		document.getElementById("eventModalDescription").innerHTML = event.description
		document.getElementById("eventModalInfo").innerHTML = '<h5 class="card-title text-black">'+event.location+'</h5><h5 class="card-title text-gray"><i>'+((new Date(event.time)).toUTCString())+'</i></h5>'
		document.getElementById("eventModal").classList.add("show")
		document.getElementById("joinbutton").onclick = () => joinEvent(event)
	}
	function hideModal() {
		document.getElementById("eventModal").classList.remove("show")
	}

	function joinEvent(event) {
		console.log(event)
		hideModal()
		axios.patch("http://localhost:5001/events",{_id : event._id, members : event.members ? [...event.members, currentUser] : [currentUser]}).then((res) => {});
		window.location.reload()
	}
	var selectedEvents = events.filter(selectionFunction)
								.map(value => ({ value, sort: Math.random() }))
    							.sort((a, b) => a.sort - b.sort)
    							.map(({ value }) => value).slice(0,9);

    return (
        <div class="container-fluid min-vh-100 bg-light-grey p-4 d-flex">
	        <div class = "events-grid container-fluid">
		        { selectedEvents.length == 0 ? 
		        	"Loading..." : 
		        	selectedEvents.map((event) => (<div class="event-grid-event bg-white p-4 d-flex-column gap-3" onClick={() => showModal(event)}>
		        		<h1 class="card-title text-black">{event.name}<i class="event-privacy text-gray">{(event.isPrivate ? "Private" : "Public") + " Event"}</i></h1>
		        		<h5 class="card-title text-black">{event.location}</h5>
		        		<h5 class="card-title text-gray"><i>{(new Date(event.time)).toUTCString()}</i></h5>
		        		<p class="card-title text-black">{event.description}</p>

		        	</div>))
		    	}
		    </div>
			<div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-hidden="true" style={{display:"block"}}>
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header" style={{position:"relative"}}>
			        <h5 class="modal-title" id="eventModalName">Modal title</h5>
			        <button style={{border:"none", position:"absolute",right:"10px"}} type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body" id="eventModalInfo">
			      </div>
			      <div class="modal-body" id="eventModalDescription">
			        ...
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={hideModal}>Close</button>
			        <button type="button" id="joinbutton" class="btn btn-primary">Join</button>
			      </div>
			    </div>
			  </div>
			</div>

        </div>
    )
}

export default Events;