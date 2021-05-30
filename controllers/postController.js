const db = require("../models");
const axios = require('axios');
const router = require('express').Router();


//---------THIS ROUTE WORKS------------------
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      // .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //---------THIS ROUTE WORKS------------  *****************THIS IS THE REGISTER NEW USER ROUTE*************************
  create: function (req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //-------------THIS ROUTE WORKS AS IS---------------******IF WE UNCOMMENT EVERYTHING THAT'S IN IT, IT BREAKS*****************
  //   findOne: function (req, res) {
  //     const userData = db.User.findOne({ email: req.body.email })
  //     if (!userData) {
  //       res.status(400).json({ message: 'Incorrect Email or Password, please try again' })
  //       return;
  //     }
  //     console.log("******-----")
  //     console.log(userData)

  //     req.session.save(() => {
  //                    req.session.user_id = userData.id;
  //                    req.session.logged_in = true;

  //                    res.json({ user: userData, message: 'You Are Now Logged In!'});
  //                })
  //     res.json({ user: userData, message: 'You Are Now Logged In!'})
  //      .then(dbModel => res.json(dbModel))

  //     .catch(err => res.status(422).json(err))
  // },


  findOne: async function (req, res) {
    
    try {
      const userData = await db.User.findOne({ email: req.body.email })
      console.log("******")
      console.log(userData)
      if (!userData) {
        res.status(400).json({ message: 'Incorrect Email or Password, please try again----' });
        return;
      }

      // const validPass = await userData.checkPassword(req.body.password);
      // console.log("-------")
      // console.log(validPass)
      // if (!validPass) {
      //   res.status(400).json({ message: 'Incorrect Email or Password, please try again' });
      //   return;
      // }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'You Are Now Logged In!' });
      });

      console.log('hi user');
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  },





  // update: function(req, res) {
  //   db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.User.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
}