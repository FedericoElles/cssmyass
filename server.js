// server.js
// where your node app starts

// init project
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var glob = require("glob")
var fs = require("fs");
var sass = require('node-sass'); 
var compression = require('compression');

var meta = require('./meta.json');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(compression());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  //response.sendFile(__dirname + '/views/index.html');
  glob("./public/?/**/*.scss", function (er, files) {
    var items = [];
    files.forEach(function(file){
      var parts = file.split('/');
      console.log(parts);
      var item = {
        id: parts[2] + '-' + parts[3],
        version: parts[3].split('.').shift(),
        url: '/get/' + (file.substr(9)).replace('.scss','') + '/',
        params: ''
      };
      
      //meta info
      if (meta[item.id]){
        item.meta = meta[item.id];
        
        if(item.meta.params){
          item.meta.params.forEach(function(param){
            item.params += encodeURIComponent(param.example) + '/';
          })
        }
      }
      
      items.push(item);
      
    });
    var data = {
      items: items
    };
    res.render('home', data);  
  })
  
});

/*Return all available Styles*/
app.get("/get", function (req,res){
  glob("./public/?/**/*.scss", function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
    var paths = [];
    files.forEach(function(file){
      paths.push('https://cssmyass.glitch.me/get/' + (file.substr(9)).replace('.scss','') + '/param1/param2');
    });
    res.setHeader("Content-Type", "application/javascript");
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
  data.scssParams = '';
  
  data.params.forEach(function(param, index){
    if (param){
      data.scssParams += '$p' + (index+1) + ': '  + decodeURIComponent(param) + ';\n';
    }
  });
  
  data.file = './public/'+data.type+'/' + data.name + '/' + data.version + '.scss';
  
  var scss = fs.readFileSync(data.file).toString();
  
  var style = sass.renderSync({
    data: data.scssParams + scss,
    includePaths: ['./public/mixins/']//,
    //outputStyle: 'compressed'
  });
  res.setHeader("Content-Type", "text/css");
  var header = '/*  Version: ' + data.version + '  Created: ' + new Date() + ' */\n';
  data.css = header + style.css;  
  
  res.send(data.css);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
