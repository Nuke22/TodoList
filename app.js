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
let tasks = null

// db section

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/todoList', { useNewUrlParser: true, useUnifiedTopology: true });

// making schema
const taskSchema = new mongoose.Schema({
  task: String
})

// making model
const task = new mongoose.model("Task", taskSchema)


app.get('/', function (req, res) {
  const currentFormattedDate = makeFormattedDate(currentDate)
  task.find({}, (e, r) => {
    if(e) {
      console.log(e)
    } else {
      res.render("index", {date: currentFormattedDate, tasks: r})
    }
  }) 

})

app.post("/", function (req, res) {
  task.insertMany([{ task: req.body.taskText }], (e, r) => e ? console.log(e) : console.log(r))
  res.redirect("/")
})
app.listen(port)


function makeFormattedDate (dateObj) {
  const day = daysOfTheWeek[dateObj.getDay()]
  const month = dateObj.toLocaleString('default', { month: 'long' })
  const date = dateObj.getDate()
  return `${day}, ${month} ${date}`
}