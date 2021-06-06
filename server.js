const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require('express-session');
const app = express();

const sess = {
  secret: 'Very secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  //store: new SequelizeStore({
    //  db: sequelize
  //})
};

app.use(session(sess));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactcms");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
