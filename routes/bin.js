var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bindb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'bindb' database");
        db.collection('bins', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'bins' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findBinByLocation = function(req, res) {//몽고디비 쿼리...
    var latitude = req.params.binLatitude;
    var longitude = req.params.binLogitude;
    console.log('positioning bin: ' + latitude + "&" + longitude);
    /*db.collection('bins', function(err, collection) {
        collection.find({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });*/
    db.bins.find(
   {
     location: {
        $nearSphere: {
           $geometry: {
              type : "Point",
              coordinates : [ -73.9667, 40.78 ]
           },
           $minDistance: 1000,
           $maxDistance: 5000
        }
     }
   }
)
};
 
exports.findAll = function(req, res) {
    db.collection('bins', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addbin = function(req, res) {//json으로 받아서 바로 저장
    var bin = req.body;
    console.log('Adding bin: ' + JSON.stringify(bin));
    db.collection('bins', function(err, collection) {
        collection.insert(bin, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
    $geometry: {
   type: "Polygon",
   coordinates: [ <coordinates> ],
   crs: {
      type: "name",
      properties: { name: "urn:x-mongodb:crs:strictwinding:EPSG:4326" }
   }
   { type: "Point", coordinates: [ 40, 5 ] }
	}
}
 
exports.updatebin = function(req, res) {//나중 기능
    var id = req.params.id;
    var bin = req.body;
    console.log('Updating bin: ' + id);
    console.log(JSON.stringify(bin));
    db.collection('bins', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, bin, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating bin: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(bin);
            }
        });
    });
}
 
exports.deletebin = function(req, res) {
    var id = req.params.id;
    console.log('Deleting bin: ' + id);
    db.collection('bins', function(err, collection) {
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
 
    var bins = [
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
 
    db.collection('bins', function(err, collection) {
        collection.insert(bins, {safe:true}, function(err, result) {});
    });
 
};