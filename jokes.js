var express = require('express');
var app = express();

// MongoDB
var mongodb = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var mongoURI = "mongodb://" + process.env.MLAB_USER + ":" + process.env.MLAB_PASS +"@ds153735.mlab.com:53735/mlabtut"
// vars for pooled connections
var db, collection;

var bodyParser = require("body-parser")
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/oneJoke", function(req, res){
	collection.count(function(err, count){
		var randNum = Math.floor(Math.random() * count);
		// console.log("Jokes found: " + count);
		// console.log("Joke chosen: " + randNum);
		collection.find().limit(-1).skip(randNum).next(function(err, joke){
			// console.log(joke);
			res.send(joke);
		});
	});	
});

app.get("/allJokes", function(req, res){
	collection.find().toArray(function(err, resArray){
		res.send(resArray);
	});
});

app.put("/upvote", function(req, res){
	console.log("Someone tried to upvote joke #" + req.body.id);
	collection.findOneAndUpdate(
		{"_id": ObjectId(req.body.id)},  // which joke to update?
		{$inc: {"score": 1}}, // how do we update the joke?
		{returnOriginal: false},
		function(err, result){ // callback, with new score
			res.json({
				newScore: result.value.score
			})
		}
	);
});

app.put("/downvote", function(req, res){
	// console.log("Someone tried to downvote joke #" + req.body.id);]
	collection.findOneAndUpdate(
		{"_id": ObjectId(req.body.id)},  // which joke to update?
		{$inc: {"score": -1}}, // how do we update the joke?
		{returnOriginal: false},
		function(err, result){ // callback, with new score
			res.json({
				newScore: result.value.score
			})
		}
	);

});

app.post("/createJoke", function(req, res){
	console.log("Someone tried to add a joke.")
	collection.insert(req.body);
	res.send({"ok": true});
});

app.delete("/deleteJoke", function(req, res){
	var idToDelete = req.body.id;
	console.log("Someone tried to delete joke #" + idToDelete);
	collection.deleteOne({_id: ObjectId(idToDelete)},
		function(err, result){
			res.send(result);
		})
})

mongodb.connect(mongoURI, function(err, dbase){
	// have one main connection to MongoDB
	// Use this connection for literally everything else.
	db = dbase;
	collection = db.collection("jokes");
	app.listen(process.env.PORT || 3000, function () {
		console.log('Listening on http://localhost:3000');
	});
})

