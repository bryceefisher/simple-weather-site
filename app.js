const express = require("express");
const https = require("https");
const { url } = require("inspector");
const app = express();
app.use(express.urlencoded({ extended: true }));
const query = "london";
const apiKey = "eec3d79173a3898efcc286db6eab7e45";
const units = "imperial";
const weatherApi =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  query +
  "&appid=" +
  apiKey +
  "&units=" +
  units;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityInput
  const apiKey = "eec3d79173a3898efcc286db6eab7e45";
  const units = req.body.unitInput
  const weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  https.get(weatherApi, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weather = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;
      const weatherURL =
        "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Fahrenheit.</h1>"
      );
      res.write("<h1> The weather is currently " + weather + ".</h1>");
      res.write("<img src=" + weatherURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
