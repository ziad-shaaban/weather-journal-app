// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("weather-app"));

// Setup Server
app.listen(5000, () => {
  console.log(`server is runing on http://localhost:5000`);
});

// send data
app.post("/addweather", (req, res) => {
  // destruction
  const { newDate, temp, feeling, cityName } = req.body;
  projectData.date = newDate;
  projectData.temp = temp;
  projectData.feeling = feeling;
  projectData.cityName = cityName;
  res.end();
});

// get data

app.get("/getweather", (req, res) => {
  res.send(projectData);
});
