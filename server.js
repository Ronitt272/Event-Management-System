const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5001;

const Event = require("./models/event")
const User = require("./models/user")

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/playground');

app.listen(PORT, () => {
    console.log(`Server started running! (PORT: ${PORT})`)
})

// creating API for updating user profile whenever user makes any edits to his/her profile
app.put('/updateuser', async (req, res) => {
    const {email, name, bio} = req.body;
    const user = await User.findOneAndUpdate({email: email}, {name: name, bio: bio}, {new: true});

    // handling case if user is not present
    if (!user) {
        return res.status(404).send("User not found!");
    }
    res.json({ message: "Profile successfully updated", user});
});



const { spawn } = require('child_process');

app.post('/events', async (req, res) => {
	req.body["members"] = []
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
});
app.patch('/events', async (req, res) => {
	let event = await Event.findById(req.body._id)
	event.set({'members': req.body.members})
	await event.save()
});

app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});


