/* Global Variables */
const apiKey = "a711d582ff661e410852462789360fab&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

const button = document.getElementById("generate");

button.addEventListener("click", async () => {
  let zipCode = document.getElementById("search").value;
  let feeling = document.getElementById("feeling").value;
  console.log(feeling);

  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
  const response = await fetch(url).then((res) => res.json());
  const temp = await response.main.temp;
  const cityName = await response.name;
  console.log(response);

  // post request to server.js
  await fetch("/addweather", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      newDate,
      temp,
      feeling,
      cityName
    })
  });

  // get request from server.js
  const fetchedData = await fetch("/getweather").then((res) => res.json());

  // adding fetched data
  console.log(fetchedData.feeling);
  document.getElementById("date").innerHTML = fetchedData.date;
  document.querySelector(".temp-num").innerHTML = fetchedData.temp + "°";
  document.getElementById("felling-text").innerHTML = fetchedData.feeling;
  document.querySelector("#city").innerHTML = fetchedData.cityName;

  // adding icon and description of the weather
  response.weather.forEach((element) => {
    document.getElementById("description").innerHTML = element["description"];
    document.querySelector(
      "img"
    ).src = `http://openweathermap.org/img/w/${element["icon"]}.png`;
  });
});
