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
                // console.log("========================");
            }
        }
        
    });
};