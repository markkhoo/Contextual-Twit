require('dotenv').config();
const Twitter = require('twitter');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

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

client.get('search/tweets', { q: searchQuery, lang: 'en', count: 10 }, function (error, tweets, response) {

  const data = [];
  const toneChatParams = { utterances: [] };

  tweets.statuses.forEach(function (tweet) {
    toneChatParams.utterances.push({
      text: tweet.text.replace(/(\r\n|\n|\r)/gm, " "),
    });
  });

  // console.log(tweets.statuses); console.log(toneChatParams);

  toneAnalyzer.toneChat(toneChatParams)
    .then(utteranceAnalyses => {

      // console.log(JSON.stringify(utteranceAnalyses, null, 2));
      // utteranceAnalyses.result.utterances_tone.forEach((data1) => {
      //   console.log(data1);
      // });

      for (let i = 0; i < tweets.statuses.length; i++) {
        if (toneChatParams.utterances[i].text === utteranceAnalyses.result.utterances_tone[i].utterance_text) {
          data.push({
            id: i,
            created_at: tweets.statuses[i].created_at,
            id_str: tweets.statuses[i].id_str,
            screen_name: tweets.statuses[i].user.screen_name,
            user_verified: tweets.statuses[i].user.verified,
            is_quote_status: tweets.statuses[i].is_quote_status,
            retweet_count: tweets.statuses[i].retweet_count,
            favorite_count: tweets.statuses[i].favorite_count,
            hashtags: tweets.statuses[i].entities.hashtags,
            lang: tweets.statuses[i].lang,
            text: utteranceAnalyses.result.utterances_tone[i].utterance_text,
            tones: utteranceAnalyses.result.utterances_tone[i].tones
          });
        } else {
          data.push({
            id: i,
            created_at: tweets.statuses[i].created_at,
            id_str: tweets.statuses[i].id_str,
            screen_name: tweets.statuses[i].user.screen_name,
            user_verified: tweets.statuses[i].user.verified,
            is_quote_status: tweets.statuses[i].is_quote_status,
            retweet_count: tweets.statuses[i].retweet_count,
            favorite_count: tweets.statuses[i].favorite_count,
            hashtags: tweets.statuses[i].entities.hashtags,
            lang: tweets.statuses[i].lang,
            text: toneChatParams.utterances[i].text,
            tones: []
          });
        };
      };

      console.log(data); // <=== Data to deliver here!

    })
    .catch(err => {
      console.log('error:', err);
    });

});
