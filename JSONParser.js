let JSONPars = require('./JSONParse.js');

var fs = require('fs');

fs.readFile('./JSONData', 'utf8', function(err, contents) {
    console.log(JSONPars.parseJSON(contents));
});



 


