const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.nomeCidade;
    const apiKey = "9209b3c5f98c950fa219affedb08b07d";
    const units = "metric";
    const lang = "pt";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "&lang=" + lang;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>A temperatura em " + query + " e " + temp + " Graus Celcius.</h1>");
            res.write("<h1>A temperatura esta: " + weatherDescription + "</h1>");
            res.write("<img src = " + imageURL + " >")
            res.send();
        });
    });
});

app.listen(3000, function (req, res) {
    console.log("Servidor inicializado na porta 3000!");
});