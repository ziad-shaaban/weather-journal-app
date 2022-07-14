/* Global Variables */
const apiKey = "a711d582ff661e410852462789360fab&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

const button = document.getElementById("generate");

/**
 * add event listening click to the button
 * then call 4 function
 * */

button.addEventListener("click", async () => {
  let zipCode = document.getElementById("search").value;
  let feeling = document.getElementById("feeling").value;
  const myResponse = await apiResponse(zipCode, apiKey);
  postRequest(newDate, myResponse, feeling);
  const fetchData = await getRequest();
  showData(fetchData);
});

/*
 * first get an response from api by spending a zipcode and apikey
 * then fetch temp and cityname(extra)
 * adding icon and weather description
 */
async function apiResponse(zipCodeP, apiKeyP) {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCodeP}&appid=${apiKeyP}`;
  const response = await fetch(url).then((res) => res.json());
  const temp = await response.main.temp;
  const cityName = await response.name;
  response.weather.forEach((element) => {
    document.getElementById("description").innerHTML = element["description"];
    document.querySelector(
      "img"
    ).src = `http://openweathermap.org/img/w/${element["icon"]}.png`;
  });
  return [temp, cityName];
}

/**
 * postRequest function post request to server.js to put data on server
 */

async function postRequest(newDate, res, feeling) {
  const temp = res[0];
  const cityName = res[1];
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
}

/**
 * get request from server.js
 */

async function getRequest() {
  const fetchedData = await fetch("/getweather").then((res) => res.json());
  return fetchedData;
}

/**
 * update UI
 */
async function showData(fetchedData) {
  document.getElementById("date").innerHTML = fetchedData.date;
  document.querySelector(".temp-num").innerHTML = fetchedData.temp + "°";
  document.getElementById("felling-text").innerHTML = fetchedData.feeling;
  document.querySelector("#city").innerHTML = fetchedData.cityName;
}
