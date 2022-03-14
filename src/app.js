const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views path
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res)=>{
    res.render("index", {
        title: "Welcome",
        name: "Chesaru Mihai"
    })
})

app.get("/about", (req, res)=>{
    res.render("about",{
        title: "About Me",
        name: "Chesaru Mihai"
    })
})

app.get("/help", (req, res)=>{
    res.render("help",{
        helpText: "You need help? Contact us",
        title: "Help",
        name: "Chesaru Mihai"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must privide an address"
        })
    } 

        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if(error){
             return res.send({ error })
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    res.send({ error })
                } else {
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
                }
            })
        })
    
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorText: "Help page not found",
        title: "404",
        name: "Chesaru Mihai"
    })
})


app.get("*", (req, res) => {
    res.render("404", {
        errorText: "Page not found",
        title: "404",
        name: "Chesaru Mihai"
    })
})

app.listen(3000, ()=>{
    console.log("Server is running...")
})
