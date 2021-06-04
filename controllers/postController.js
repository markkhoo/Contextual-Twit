const db = require("../models");
// const axios = require('axios');
// const router = require('express').Router();
require('dotenv').config();
const Twitter = require('twitter');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const vader = require('vader-sentiment');
// TWITTER Authentication 
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});
//WATSON AUTHENTICATION
const toneAnalyzer = new ToneAnalyzerV3({
  authenticator: new IamAuthenticator({ apikey: process.env.TONE_ANALYZER_KEY }),
  version: '2017-09-21',
  serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com'
});


module.exports = {
  //==========================ROUTE WORKS-GETS ALL USERS*****************WE NEED TO REMOVE THIS ROUTE LATER, DON'T WANT USER INFO BEING PULLED***********************
  findAll: function (req, res) {
    db.User.find(req.query)
      // .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //=======================================ROUTE WORKS*****************REGISTER NEW USER ROUTE************************************************************************
  create: function (req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
//=========================================DOES NOT WORK************LOGOUT ROUTE***************************************************************************************
  destroy: function (req, res) {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  //======================================DOES NOT WORK****************LEAVE IT COMMENTED OUT FOR NOW*****************************************************************
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

//========================LOGIN ROUTE WORKS==========NEED TO DO A PASSWORD VALIDATION============================
//===============================================================================================================
  findOne: async function (req, res) {

    try {
      // let userData = await db.User.findOne({ email: req.body.email })
      // console.log("******1")
      // console.log(userData)

      // if (!userData) {
      //   res.status(500).json({ message: 'Incorrect Email or Password, please try again----' });
      //   return;
      // }


      userData = await db.User.findOne({email: req.body.email, password: req.body.password })
      console.log("******2")
      console.log(userData)

      if (!userData) {
        res.status(500).json({ message: 'Incorrect Email or Password, please try again!' });
        return;
      }



      // await userData.checkPassword(req.body.password, function(err, same) {
      //   if (err) {
      //     res.status(500)
      //       .json({
      //       error: 'Internal error please try again'
      //     });

      //   } else if (!same) {
      //     res.status(401)
      //       .json({
      //       error: 'Incorrect email or password'
      //     });
      //   }
      // });

      console.log("-------")
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

  getTrending: function(req, response){
    client.get('search/tweets', { q: 'trending', lang: 'en', count: 10 })
    //.then(tweet => response.json(tweet)) 
    

    .then(response => 

      response.statuses.map(
        status => {return  {text: status.text, created_at: status.created_at, screen_name: status.user.screen_name} }
        )

    )
    .then(tweets => response.json(tweets)) 
    
    .catch(err => console.log(err));
    
    
   
    
   // .catch(err => res.status(500).json(err));

  },
  
  //*****************************START OF SENTIMENT ANALYSIS API CALL ROUTE***********************************
  //********************************************************************************************************** 

//=============================================ROUTE WORKS====================================================
//============================================================================================================
  // Get Tweets
  getTwits: function (req, res) {
    console.log(req.body);
    client.get('search/tweets', { q: `${req.body.thekey}`, lang: 'en', count: 50 }, function (error, tweets, response) {

      const data = [];
      const toneChatParams = { utterances: [] };

      tweets.statuses.forEach(function (tweet) {
        toneChatParams.utterances.push({
          text: tweet.text.replace(/(\r\n|\n|\r)/gm, " "),
        });
      });

      // console.log(tweets.statuses); console.log(toneChatParams);

      // Watson-Sentiment
      toneAnalyzer.toneChat(toneChatParams)
        .then(utteranceAnalyses => {

          // console.log(JSON.stringify(utteranceAnalyses, null, 2));
          // utteranceAnalyses.result.utterances_tone.forEach((data1) => {
          //   console.log(data1);
          // });

          for (let i = 0; i < tweets.statuses.length; i++) {
            // Vader-Sentiment
            let intensity = vader.SentimentIntensityAnalyzer.polarity_scores(toneChatParams.utterances[i].text);

            if (toneChatParams.utterances[i].text === utteranceAnalyses.result.utterances_tone[i].utterance_text) {
              data.push({
                id: i,
                created_at: tweets.statuses[i].created_at,
                id_str: tweets.statuses[i].id_str,
                screen_name: tweets.statuses[i].user.screen_name,
                followers_count: tweets.statuses[i].user.followers_count,
                user_verified: tweets.statuses[i].user.verified,
                is_quote_status: tweets.statuses[i].is_quote_status,
                retweet_count: tweets.statuses[i].retweet_count,
                favorite_count: tweets.statuses[i].favorite_count,
                hashtags: tweets.statuses[i].entities.hashtags,
                lang: tweets.statuses[i].lang,
                text: utteranceAnalyses.result.utterances_tone[i].utterance_text,
                watson_tones: utteranceAnalyses.result.utterances_tone[i].tones,
                vader_intensity: intensity
              });
            } else {
              data.push({
                id: i,
                created_at: tweets.statuses[i].created_at,
                id_str: tweets.statuses[i].id_str,
                screen_name: tweets.statuses[i].user.screen_name,
                followers_count: tweets.statuses[i].user.followers_count,
                user_verified: tweets.statuses[i].user.verified,
                is_quote_status: tweets.statuses[i].is_quote_status,
                retweet_count: tweets.statuses[i].retweet_count,
                favorite_count: tweets.statuses[i].favorite_count,
                hashtags: tweets.statuses[i].entities.hashtags,
                lang: tweets.statuses[i].lang,
                text: toneChatParams.utterances[i].text,
                watson_tones: [],
                vader_intensity: intensity
              });
            };
          };

          // console.log(data); 
          res.json(data)// <=== Data to deliver here!
        })
        
        .catch(err => {
          console.log('error:', err);
        });

    })
  }
}