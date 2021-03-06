const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactcms");

const userSeed = [
    {
        username: "Manuel",
        email: "manuelrios12963771@gmail.com",
        password: "password"
    },
    {
        username: "Javier",
        email: "javier@gmail.com",
        password: "password"
    },
    {
        username: "mark",
        email: "mark123@gmail.com",
        password: "password"
    },
    {
        username: "reesh",
        email: "reesh@gmail.com",
        password: "password"
    },
    {
        username: "joe",
        email: "joemama@gmail.com",
        password: "password"
    },
    {
        username: "ligma",
        email: "ligmaballs@gmail.com",
        password: "password"
    },
    {
        username: "sugandeez",
        email: "sugandeeznuts@gmail.com",
        password: "password"
    },
    {
        username: "villa",
        email: "villa@gmail.com",
        password: "password"
    },
]

const tagSeed = [
    {
        name: "#Valorant"
    },
    {
        name: "#BTD6"
    },
    {
        name: "#California"
    },
    {
        name: "#Youtube"
    },
    {
        name: "@Elon"
    },
    {
        name: "JavaScript"
    },
    {
        name: "#Python"
    },
    
]


db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


  db.Tag.remove({})
  .then(() => db.Tag.collection.insertMany(tagSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });