import {React, useState, useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Events = ({currentUser}) => {
	// const [events, setEvents] = useState([]);
	function postCreateEvent() {
        var data = {
            name : document.getElementById("eventInputName").value,
            owner : currentUser,
            time : document.getElementById("eventInputDate").value,
            location : document.getElementById("eventInputLocation").value,
            description : document.getElementById("eventInputDesc").value,
            isPrivate : document.getElementById("eventInputIsPrivate").checked
      }
		axios.post("http://localhost:5001/events",data).then((res) => {
            	console.log(res.data)
            })
        window.location.reload();
	}


    return (
        <div class="container-fluid min-vh-100 bg-light-grey p-4 d-flex justify-content-center">
            <div class="bg-white p-4 d-flex-reverse">
              <div class="form-group mb-3">
                <label for="eventInputName">Event Name</label>
                <input type="text" class="form-control" id="eventInputName" aria-describedby="nameHelp" name="name" placeholder="Enter event name" />
                <small id="nameHelp" class="form-text text-muted">This is what other people will see first about your event!</small>
              </div>
              <div class="form-group mb-3">
                <label for="eventInputLocation">Date and Time</label>
                <input type="datetime-local" class="form-control" id="eventInputDate" name="date" placeholder="Enter event date and time" />
              </div>
              <div class="form-group mb-3">
                <label for="eventInputLocation">Location</label>
                <input type="text" class="form-control" id="eventInputLocation" name="location" placeholder="Enter location" />
              </div>
              <div class="form-group mb-3">
                <label for="eventInputDesc">Description</label>
                <textarea class="form-control" id="eventInputDesc" name="description" placeholder="Enter description"></textarea>
              </div>
              <div class="form-check mb-3">
                <input type="checkbox" class="form-check-input" name="isPrivate" id="eventInputIsPrivate" />
                <label class="form-check-label" for="eventInputIsPrivate">Private</label>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mx-auto" onClick = {postCreateEvent}>Submit</button>
              </div>
            </div>
        </div>
    )
}

export default Events;