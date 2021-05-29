const db = require("../models");
const axios = require('axios')


//---------THIS ROUTE WORKS------------------
module.exports = {
    findAll: function(req, res) {
      db.User.find(req.query)
        // .sort({ _id: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },


    findOne: async function(req, res) {
      db.User.findOne({where: {username: req.body.username}})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //---------THIS ROUTE WORKS------------------
    create: function(req, res) {
      db.User.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
      db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      db.User.findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}