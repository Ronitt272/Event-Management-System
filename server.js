const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost');

app.listen(PORT, () => {
    console.log(`Server started running! (PORT: ${PORT})`)
})

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  });

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    console.log("test")
res.json({msg:"Hiii"});
});