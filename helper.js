var fs = require('fs');

var helpers = {};

helpers.readFileOptional = function(filePath, defaultContent, cb){
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (!err){
        cb(data);
      }else{
        cb(defaultContent);
      }

  });
}

module.exports = helpers;