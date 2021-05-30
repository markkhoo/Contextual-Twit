const db = require("../models");
const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();
const Twitter = require('twitter');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const vader = require('vader-sentiment');
// Authentication 
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});
const toneAnalyzer = new ToneAnalyzerV3({
  authenticator: new IamAuthenticator({ apikey: process.env.TONE_ANALYZER_KEY }),
  version: '2017-09-21',
  serviceUrl: 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com'
});

// ==============================================
// ========== INPUT SEARCH QUERY BELOW ==========
// ==============================================
const searchQuery = 'valorant';


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

  destroy: function (req, res) {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
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

  //*****************************************START OF SENTIMENT ANALYSIS API CALL************************************
  //***************************************************************************************************************** 

  // Get Tweets
  getTwits: function (req, res) {
    console.log("------***")
    console.log(req)
    client.get('search/tweets', { q: req.body.twit, lang: 'en', count: 10 }, function (error, tweets, response) {

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
          console.log("******data")
          console.log(data); // <=== Data to deliver here!
          res.json(data)
        })
        
        .catch(err => {
          console.log('error:', err);
        });

    })
  }
}