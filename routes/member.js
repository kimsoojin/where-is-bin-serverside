exports.findByToken = function(req, res) {
    var token = req.params.facebooktoken;

    console.log('member: ' + token);
    db.collection('members', function(err, collection) {
        collection.find({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('members', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addmember = function(req, res) {
    var member = req.body;
    console.log('Adding member: ' + JSON.stringify(member));
    db.collection('members', function(err, collection) {
        collection.insert(member, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updatemember = function(req, res) {
    var id = req.params.id;
    var member = req.body;
    console.log('Updating member: ' + id);
    console.log(JSON.stringify(member));
    db.collection('members', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, member, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating member: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(member);
            }
        });
    });
}
 
exports.deletemember = function(req, res) {
    var id = req.params.id;
    console.log('Deleting member: ' + id);
    db.collection('members', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var members = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('members', function(err, collection) {
        collection.insert(members, {safe:true}, function(err, result) {});
    });
 
};