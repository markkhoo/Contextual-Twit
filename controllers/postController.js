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


    findOne: function(req, res) {
      const userData = db.User.findOne({ email: req.body.email})
                  //   if (!userData){
                  //     res.status(400).json({message:'Incorrect Email or Password, please try again'});
                  //     return;
                  // }

                 
     .then(dbModel => res.json(dbModel))
     .catch(err => res.status(422).json(err))
    },


  //   findOne: async function(req,res) {
  //     try {
  //         const userData = await db.User.findOne({ where: { username: req.body.username } });
  
  //         if (!userData){
  //             res.status(400).json({message:'Incorrect Email or Password, please try again----'});
  //             return;
  //         }
  
  //         const validPass = await userData.checkPassword(req.body.password);
  
  //         if (!validPass){
  //             res.status(400).json({message:'Incorrect Email or Password, please try again'});
  //             return;
  //         }
  
  //         // req.session.save(() => {
  //         //     req.session.user_id = userData.id;
  //         //     req.session.logged_in = true;
              
  //         //     res.json({ user: userData, message: 'You Are Now Logged In!'});
  //         // });
  
  //         console.log('hi user');
  //     } catch (err) {
  //         res.status(400).json(err);
  //     }
  // },
  



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