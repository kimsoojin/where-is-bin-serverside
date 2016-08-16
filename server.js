var express = require('express'),
    bin = require('./routes/bin');
var app = express();
 
app.get('/bin', bin.findAll);
app.get('/bin/:id', bin.findById);
 
app.listen(3000);
console.log('Express Listening on port 3000...');