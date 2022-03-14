const request = require('postman-request');

const forecast = (  longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bb77a36cf82c50b038bdf2efa8c171e9&query=" + latitude + "," + longitude + "&units=m";

    request({url, json: true}, (error, { body })=>{
        if(error){
            callback("Unable to connect to the weather server!", undefined)
        } else if (body.error){
            callback("Unable to get the location. Please try again", undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " C degrees out. It feels like " + body.current.feelslike + " C degrees . There are " + body.current.precip + "% chances of rain. The wind speed is " + body.current.wind_speed + " km/h.")
        }
    })
}

module.exports = forecast;