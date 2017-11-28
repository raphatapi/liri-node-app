var fs = require("fs");

var inquirer = require("inquirer");
inquirer.prompt([
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
            spotifyPrompt();
            break;
        case "Movie This":
            omdb();
            break;
        case "Do What I Say":
            doWhatISay();
            break;
    };
});

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
                
                var tweetsObject = {text: tweets[i].text, created: tweets[i].created_at};
                fs.appendFileSync("log.txt", JSON.stringify(tweetsObject, null, 2));
                
            };
        };
        
    });
};

function spotify(answer) {
   
    if (answer.spotifyName) {
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: "761cc4c64d7a4cc5946c3c3d7de2868c",
            secret: "351cf552a888409097d9c99d7b478e79"
        });
        var uri = "https://api.spotify.com/v1/search?q=" + answer.spotifyName + "&type=track&limit=1"; 
        spotify.request(uri).then(function(data) {
            var song =  data.tracks.items[0];
            var songsObject = {
                Artist: song.artists[0].name,
                Name: song.name,
                Link: song.external_urls.spotify,
                Album: song.album.name
            };
            console.log("#################################");
            console.log("# Artist: " + songsObject.Artist);
            console.log("# Song Name: " + songsObject.Name);
            console.log("# Listen: " + songsObject.Link);
            console.log("# Album: " + songsObject.Album);
            console.log("#################################");

            fs.appendFileSync("log.txt", JSON.stringify(songsObject, null, 2));

        }).catch(function(err) {
            console.error('Error occurred: ' + err); 
        });
    } else {
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify({
            id: "761cc4c64d7a4cc5946c3c3d7de2868c",
            secret: "351cf552a888409097d9c99d7b478e79"
        });
        var uri = "https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc";
        spotify.request(uri).then(function(data) {
            var songsObject = {
                Artist: data.artists[0].name,
                Name: data.name,
                Link: data.external_urls.spotify,
                Album: data.album.name
            };
            console.log("#################################");
            console.log("# Artist: " + songsObject.Artist);
            console.log("# Song Name: " + songsObject.Name);
            console.log("# Listen: " + songsObject.Link);
            console.log("# Album: " + songsObject.Album);
            console.log("#################################");

            fs.appendFileSync("log.txt", JSON.stringify(songsObject, null, 2));

        }).catch(function(err) {
            console.error("Error occurred: " + err); 
        });
    };
    
};

function spotifyPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "What Song?",
            name: "spotifyName"
        }
    ]).then(function(res){
        spotify(res);
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
        if (movie.omdb) {
            var request = require("request");
            var queryUrl = "http://www.omdbapi.com/?t=" + movie.omdb + "&apikey=faa36345";
            request(queryUrl, function(error, response, body){
                if (!error && response.statusCode === 200) {
                    var moviesObject = {
                        Name: JSON.parse(body).Title,
                        Year: JSON.parse(body).Year,
                        imdbRating: JSON.parse(body).imdbRating,
                        rottenRating: JSON.parse(body).Ratings[1].Value,
                        Production: JSON.parse(body).Country,
                        Language: JSON.parse(body).Language,
                        Plot: JSON.parse(body).Plot,
                        Actors: JSON.parse(body).Actors
                    };
                    console.log("**************************************************************");
                    console.log("* The movie is: " + moviesObject.Name);
                    console.log("* Released Year: " + moviesObject.Year);
                    console.log("* IMDB Rating: " + moviesObject.imdbRating);
                    console.log("* Rotten Tomatoes Rating: " + moviesObject.rottenRating);
                    console.log("* Production Country: " + moviesObject.Production);
                    console.log("* Languages: " + moviesObject.Language);
                    console.log("* Plot of the movie: " + moviesObject.Plot);
                    console.log("* Actors: " + moviesObject.Actors);
                    console.log("**************************************************************");

                    fs.appendFileSync("log.txt", JSON.stringify(moviesObject, null, 2));
                };
            });
        } else {
            var request = require("request");
            var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&apikey=faa36345";
            request(queryUrl, function(error, response, body){
                if (!error && response.statusCode === 200) {
                    var moviesObject = {
                        Name: JSON.parse(body).Title,
                        Year: JSON.parse(body).Year,
                        imdbRating: JSON.parse(body).imdbRating,
                        rottenRating: JSON.parse(body).Ratings[1].Value,
                        Production: JSON.parse(body).Country,
                        Language: JSON.parse(body).Language,
                        Plot: JSON.parse(body).Plot,
                        Actors: JSON.parse(body).Actors
                    };
                    console.log("**************************************************************");
                    console.log("* The movie is: " + moviesObject.Name);
                    console.log("* Released Year: " + moviesObject.Year);
                    console.log("* IMDB Rating: " + moviesObject.imdbRating);
                    console.log("* Rotten Tomatoes Rating: " + moviesObject.rottenRating);
                    console.log("* Production Country: " + moviesObject.Production);
                    console.log("* Languages: " + moviesObject.Language);
                    console.log("* Plot of the movie: " + moviesObject.Plot);
                    console.log("* Actors: " + moviesObject.Actors);
                    console.log("**************************************************************");

                    fs.appendFileSync("log.txt", JSON.stringify(moviesObject, null, 2));
                };
            });
        };
    });
};

function doWhatISay() {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if (error) {
            return console.log(error);
          }
        var dataArr = data.split(",");
        var answer = {};
        answer.spotifyName = dataArr[1];
        spotify(answer);      
    });
};