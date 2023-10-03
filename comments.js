//Create a web server
const express = require('express');
const app = express();
const port = 3000;

//Connect to database
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'comments';
const collectionName = 'comments';
const client = new MongoClient(url, {useNewUrlParser: true});

//Connect to database
client.connect(function(err) {
    if (err) {
        console.log('Unable to connect to database');
        throw err;
    }
    console.log('Connected to database');

    //Define database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    //Create a new comment
    app.post('/comments', function(req, res) {
        let comment = {
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment
        };
        collection.insertOne(comment, function(err, result) {
            if (err) {
                console.log('Unable to insert comment');
                throw err;
            }
            console.log('Inserted comment');
            res.status(200).send('Comment inserted');
        });
    });

    //Get all comments
    app.get('/comments', function(req, res) {
        collection.find({}).toArray(function(err, result) {
            if (err) {
                console.log('Unable to get comments');
                throw err;
            }
            console.log('Got comments');
            res.status(200).send(result);
        });
    });

    //Get comment by id
    app.get('/comments/:id', function(req, res) {
        let id = req.params.id;
        collection.findOne({_id: mongodb.ObjectId(id)}, function(err, result) {
            if (err) {
                console.log('Unable to get comment');
                throw err;
            }
            console.log('Got comment');
            res.status(200).send(result);
        });
    });

    //Update a comment by id
    app.put('/comments/:id', function(req, res) {
        let id = req.params.id;
        let newComment = {
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment
        };
        collection.updateOne({_id: mongodb.ObjectId(id)}, {$set: newComment}, function(err, result) {
            if (err) {
                console.log('Unable to update comment');
                throw err;
            }
            console.log('Updated comment');
            res.status(200).send('Comment updated');
        }
        );
    }
    );
});