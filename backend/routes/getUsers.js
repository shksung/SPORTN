const express = require('express')
const router = express.Router()
const Controller = require('../controllers/users')

router.get('/', (req, res) => {
    Controller.getUser().then(user =>
        res.json(user)
    )
})

router.put('/', (req, res) => {
    if (req.body.attribute === "bio") {
        Controller.updateUserBio(req.body, req.body.id).then(user => res.json(user))}
    else {
        Controller.updateUserInterests(req.body, req.body.id).then(user => res.json(user))
    }
   
}

)

module.exports = router