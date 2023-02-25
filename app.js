const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000
const path = require("path")

app.set('view engine', 'twig')
app.set('views', path.join(__dirname + "/views"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const currentDate = new Date()
const daysOfTheWeek = ["Sunday", "Monday", "Tueasday", "Wednesday", "Thursday", "Friday", "Saturday"]

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