const express = require('express')
const router = express.Router()
const Controller = require('../controllers/events')
const request = require('request')
let geoobj = []

function lat(address, city) {
    let apiAddress = address.split(' ').join('+') + "+" + city

    let api = "https://api.opencagedata.com/geocode/v1/json?q=" + apiAddress + "&key=3989d0c3780f45029f1ed78a5806ed0d"

    request(api, function (err, response, body) {
        let geoObject = JSON.parse(body)
        let latitude = geoObject.results[0].geometry.lat
        let longitude = geoObject.results[0].geometry.lng
        console.log({ latitude: latitude, longitude: longitude })
        geoobj.push({ latitude: latitude, longitude: longitude })
    })
}


router.get('/', (req, res) => {
    Controller.getEvents().then((events) =>
        events.forEach(event => lat(event.address, event.city))
    )
    res.json(geoobj)
})



module.exports = router