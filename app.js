const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose'); 
const app = express()
const port = 3000
const path = require("path")

// env settings
app.set('view engine', 'twig')
app.set('views', path.join(__dirname + "/views"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// global variables
const currentDate = new Date()
const daysOfTheWeek = ["Sunday", "Monday", "Tueasday", "Wednesday", "Thursday", "Friday", "Saturday"]
const tasks = [
  {id: 1, task: "do something"},
  {id: 2, task: "do nothing!"}
]

// db section
function main() {
  mongoose.set("strictQuery", false);
  mongoose.connect('mongodb://127.0.0.1:27017/todoList', { useNewUrlParser: true, useUnifiedTopology: true });
  
  // making schema
  const taskSchema = new mongoose.Schema({
    task: String
  })

  // making model
  const task = new mongoose.model("Task", taskSchema)

  task.find({}, (e, r) => {e ? console.log(e) : console.log(r)})
}

app.get('/', function (req, res) {
  const currentFormattedDate = makeFormattedDate(currentDate)
  res.render("index", {date: currentFormattedDate, tasks: tasks})
})
app.listen(port)


function makeFormattedDate (dateObj) {
  const day = daysOfTheWeek[dateObj.getDay()]
  const month = dateObj.toLocaleString('default', { month: 'long' })
  const date = dateObj.getDate()
  return `${day}, ${month} ${date}`
}