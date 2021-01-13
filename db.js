const mongoose = require('mongoose')
const User = require('./users')

mongoose.connect('mongodb://localhost:27017/PaginatedApi' , { useNewUrlParser: true , useUnifiedTopology: true })
.then(res => { console.log(`Connected to MongoDB @ PaginatedApi`) })
.catch(error => { console.log(error) })

const db = mongoose.connection

db.once('open' , async () => {
    if( await User.countDocuments() > 0) return

    Promise.all([
        User.create({name: "User 1" , age: 20}),
        User.create({name: "User 2" , age: 21}),
        User.create({name: "User 3" , age: 22}),
        User.create({name: "User 4" , age: 23}),
        User.create({name: "User 5" , age: 24}),
        User.create({name: "User 6" , age: 25}),
        User.create({name: "User 7" , age: 26}),
        User.create({name: "User 8" , age: 27}),
        User.create({name: "User 9" , age: 28}),
        User.create({name: "User 10" , age: 29})
    ]).then(() => console.log("Added Users"))
})