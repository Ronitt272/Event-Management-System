import React, { useState } from 'react';
import '../styles/profile.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { set } from 'mongoose';



const Profile = () => {
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('a passionate event planner')
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggle the editing state
      };

    const handleNameChange = (e) => setName(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);
      

  return (
    <div className="container-fluid min-vh-100 bg-light-grey p-4 d-flex gap-3"> {/* Added gap-3 for spacing */}
      {/* Left Column */}
      <div className="col-md-2 d-flex flex-column flex-fill"> {/* Left Column */}
        <div className="card bg-secondary text-center shadow-lg custom-shadow flex-grow-1 d-flex align-items-center justify-content-center"> 
          <div className="card-body d-flex flex-column align-items-center justify-content-center"> {/* Center button */}
            {isEditing ? (
              <>
              <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="form-control mb-2"
                  placeholder="Enter name"
                />
                <textarea
                  value={bio}
                  onChange={handleBioChange}
                  className="form-control mb-3"
                  placeholder="Enter bio"
                />
                <button className="btn btn-custom" onClick={handleEditClick}>
                  Save
                </button>
              </>
                ):(
                    <>
                    <h3 className="card-title text-light-grey">{name}</h3>
                    <p className="text-light">{bio}</p>
                    <button className="btn btn-custom" onClick={handleEditClick}>
                        Edit Profile
                    </button>
                    </>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-md-7 d-flex flex-column justify-content-between"> {/* Reduced width to create space */}
        {/* Friends Section */}
        <div className="card mb-3 bg-secondary shadow-lg custom-shadow flex-grow-1"> {/* Increased margin between cards */}
          <div className="card-header text-center bg-dark-grey text-light-grey">Friends</div>
          <div className="card-body d-flex align-items-center justify-content-center"> {/* Center content */}
            <div className="row w-100">
              <div className="col-6 col-md-4 mb-3 text-center">
                <p className="text-light">Alice</p>
              </div>
              <div className="col-6 col-md-4 mb-3 text-center">
                <p className="text-light">Bob</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Attended Section */}
        <div className="card bg-secondary shadow-lg custom-shadow flex-grow-1"> {/* Make the card grow */}
          <div className="card-header text-center bg-dark-grey text-light-grey">Events Attending</div>
          <div className="card-body d-flex align-items-center justify-content-center"> {/* Center content */}
            <ul className="list-group w-100">
              <li className="list-group-item bg-secondary text-light border-0">Music Fest</li>
              <li className="list-group-item bg-secondary text-light border-0">Tech Conference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
