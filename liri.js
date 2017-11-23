var inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["My Tweets", "Spotify This Song", "Movie This", "Do What I Say"],
            name: "coolThings"
        }
    ]).then(function(user){

        switch (user.coolThings) {
            case "My Tweets":
                twitter();
                break;
            case "Spotify This Song":
                spotify();
                break;
            case "Movie This":
                omdb();
                break;
        }
    })

function twitter() {

    var twitter = require('twitter');
    var keys = require("./keys.js");
    var t = new twitter(keys);

    var params = {
        screen_name: "raphaeltapioca",
        count: 20
        };

    t.get("statuses/user_timeline", params, function(error, tweets, response) {
        
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("================================");
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
        
    });
};

function spotify() {
    inquirer.prompt([
        {
            type: "input",
            message: "What Song?",
            name: "spotify"
        }
    ]).then(function(answer){
        if (answer) {
           
            var Spotify = require('node-spotify-api');
            var spotify = new Spotify({
                id: "761cc4c64d7a4cc5946c3c3d7de2868c",
                secret: "351cf552a888409097d9c99d7b478e79"
            });
            var uri = "https://api.spotify.com/v1/search?q=" + answer.spotify + "&type=track&limit=1"; 
            spotify
            .request(uri)
            .then(function(data) {
                var song =  data.tracks.items[0];
                console.log(song.artists[0].name);
                console.log(song.name);
                console.log(song.external_urls.spotify);
                console.log(song.album.name);
            })
            .catch(function(err) {
              console.error('Error occurred: ' + err); 
            });
        };
    });
};

function omdb() {
    inquirer.prompt([
        {
            type: "input",
            message: "What Movie?",
            name: "omdb"
        }
    ]).then(function(movie){
        if (movie) {
            var request = require("request");
            var queryUrl = "http://www.omdbapi.com/?t=" + movie.omdb + "&apikey=faa36345";
            request(queryUrl, function(error, response, body){
                if (!error && response.statusCode === 200) {
                    console.log("The movie is: " + JSON.parse(body).Title);
                    console.log("Released Year: " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Production Country: " + JSON.parse(body).Country);
                    console.log("Languages: " + JSON.parse(body).Language);
                    console.log("Plot of the movie: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors);
                };
            });
        };
    });
};