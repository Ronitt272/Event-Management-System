const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5001;

const Event = require("./models/event")


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/playground');

app.listen(PORT, () => {
    console.log(`Server started running! (PORT: ${PORT})`)
})

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  });

const Todo = mongoose.model('Todo', todoSchema);

app.post('/events', async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
});

app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.json(events);
});