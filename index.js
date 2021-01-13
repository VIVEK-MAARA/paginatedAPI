const express = require('express')
const app = express()
const db = require('./db.js')
const User = require('./users')

app.get('/users' , paginatedResults(User) , (req, res) => {
    res.json(res.paginatedResults)
})

function paginatedResults(model){
    return async (req , res , next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if(endIndex < await model.countDocuments().exec()){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = await model.find().limit(limit).skip(startIndex).exec()

        res.paginatedResults = results
        next()
    }
}


app.listen(3001 , () => {
    console.log("Listening on port 3001")
})