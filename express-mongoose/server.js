const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 


// DB connections
mongoose.connect("mongodb://localhost/testDB");

// get connection object
const db = mongoose.connection;
// console everytime on error
db.on('error', (error)=>console.error(error));
// console once on db connected
db.once('open', ()=>console.log("DB connected"));

// Add tables
const User = require('./models/user');




// app settings
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');


// get all users
app.get('/', (req, res)=>{
    getUsers();
    async function getUsers() {
        try {
            const users = await User.find();
            res.render("index", {users});
            console.log(users);
        } catch (e) {
            console.log(e);
        }
    } 
})


// Add user
app.post('/', (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = Number(req.body.age);
    saveUser(firstName, lastName, age);
    res.redirect("/");
})

// Put User
app.put('/', (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = Number(req.body.age);
    saveUser(firstName, lastName, age);
    res.redirect("/");
})

async function getUsers() {
    try {
        const users = await User.find();
        console.log(users);
        // return await users.data;
    } catch (e) {
        console.log(e);
    }
}

async function saveUser(firstName, lastName, age) {
    console.log(age)
    try {
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            age: age
        })

        await user.save();
        console.log(user);
    } catch (e) {
        console.log(e);
    }
}

app.listen(3000, ()=>console.log('Server running on port 3000'));
