let JSONPars = require('./JSONParse.js');

var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function(err, contents) {
    console.log(JSON.stringify(JSONPars.parseJSON(contents),null,4));
});



 


