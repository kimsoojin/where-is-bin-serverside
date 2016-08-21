var express = require('express'),
    bin = require('./routes/bin');
    member = require('./routes/member');
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/bin', bin.findAll);
app.get('/bin/:binLatitude/:binLongitude', bin.findBinByLocation);
app.post('/bin',bin.addBin);
app.put('/bin/:id',bin.updateBin);
app.delete('/bin/:id',bin.deleteBin);

app.get('/member/:facebooktoken', member.findByToken);
 
app.listen(3000);
console.log('Express Listening on port 3000...');

 


 
