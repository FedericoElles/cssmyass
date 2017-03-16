// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var glob = require("glob")

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/*Return all available Styles*/
app.get("/get", function (req,res){
  glob("./public/**/*.scss", function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
    var paths = [];
    files.forEach(function(file){
      paths.push('https://cssmyass.glitch.me/get/' + (file.substr(9)).replace('.scss','') + '/param1/param2');
    });
    res.send(paths);
  })
});

/*Return single style*/
app.get("/get/:type/:name/:version/*", function (req, res) {
  var data = {
    type: req.params.type,
    name: req.params.name,
    version: req.params.version
  };
  
  data.params = req.originalUrl.split('/').slice(5);
  
  
  res.send(data);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
