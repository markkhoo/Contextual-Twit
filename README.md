# Contextual Twit

## Site Picture
![Site]()

## Technologies Used
- CSS - used to style an HTML document
- Javascript - adds special effects on pages
- Node.js - an open source server environment that uses JavaScript on the server
- React - a JavaScript library for building user interfaces
- Express - a Node.js web application framework that provides a robust set of features for web and mobile applications.
- MongoDB - stores data in JSON-like documents. 
- Mongoose - Used with MongoDB
- Chart.js - allows you to easily make graphs to display data
- Vader - sentiment analysis tool that is specifically attuned to sentiments expressed in social media
- Watson Tone Analyzer - uses linguistic analysis to detect emotional and language tones in written text
- Twitter API - returns a collection of relevant Tweets matching a specified query
- GitBash - for cloning repository and pushing code to GitHub
- GitHub - holds repository that deploys to GitHub Pages
- bCrypt - Used for password security
- React Promise tracker - Used to track a promise and wait until it is resolved
-React-Loader-Spinner - Used on the client side to render a loading icon while a promise is resolved
- React-flexible-sliding-menu - Used to create the toggle menu 

# Summary

Contextual Twit is a tool that can get the most recent tweets by any topic and help you find insight with sentiment analysis.
With this app, the user can see trending topics on Twitter. They can also search for a topic on Twitter and the app will render charts and data based on said search that analyzes the sentiment of the general public on that specific topic. This app can be used by companies and individuals for marketing, research, development etc. This file contains code that was created using Javascript, React and Node.js. 

## Code Snippet
```javascript
const renderTweetCollection = () => {
        let result = null;

        if (trending) {
            result = trending.map((tweet) => {
                return (
                    <div>
                        <ul>
                            <li className="collection-item avatar">
                                <h5><i className="fab fa-twitter"></i>
                                {tweet.screen_name} </h5>
                                <strong>{ tweet.created_at}</strong>
                                <p>{ tweet.text}</p>
                                    
                            </li>
                        </ul>
                    </div>
                )
            });
        }

        return result;
    };
    ```

```javascript
<javascript>

</javascript>
```

## Author Links 

Mark Khoo <br />
[Linkedin](https://github.com/markkhoo) <br />
[Github](https://www.linkedin.com/in/markdkhoo/)

Javier Mondragon <br />
[Linkedin](https://www.linkedin.com/in/javier-mondragon-7b471719b/) <br />
[Github](https://github.com/javimarashall)

Manuel Villasenor <br />
[LinkedIn](https://www.linkedin.com/in/manuel-villasenor-854186205/)<br />
[GitHub](https://github.com/manuelvrsr)

Rosario Miranda <br />
[LinkedIn](https://www.linkedin.com/in/rosario-miranda-b81170132/)<br />
[GitHub](https://github.com/rtmiranda18)

