// Register models
require("./server/models/Movie");
require("./server/models/User");

// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const Movie = mongoose.model("Movie");
const User = mongoose.model("User");

// Middleware to parse request body
app.use(bodyParser.json());

// Static serve the pages
app.use(express.static(__dirname + "/dist/imdb"));
app.use("/create", express.static(__dirname + "/dist/imdb"));
app.use("/edit", express.static(__dirname + "/dist/imdb"));

// Get all movies
app.get("/movies", (req, res) => {

    // Populate producer and actor details
    Movie.find({}).populate([{ path: "producer", select: "fullName" }, { path: "actors", select: "fullName" }])
        .exec((error, movies) => {
            if (error)
                res.status(500).json({ message: "Error while getting movies", error });
            else
                res.status(200).json(movies);
        });
});

// Search producer/actor with keyword
app.get("/search/producers", (req, res) => {
    User.find({ type: req.query.type, fullName: new RegExp(req.query.keyword, "i") })
        .select("fullName")
        .exec((error, producers) => {
            if (error)
                res.status(500).json({ message: "Error while getting producers", error });
            else
                res.status(200).json(producers);
        });
});

// Create a new producer/actor
app.post("/producer", (req, res) => {
    const newProducer = new User({
        fullName: req.body.fullName,
        type
    });

    newProducer.save(error => {
        if (error)
            res.status(500).json({ message: "Error while creating a producer", error });
        else
            res.status(200).json(newProducer);
    });
});

// Get a specific movie
app.get("/movie/:movieId", (req, res) => {
    Movie.findById(req.params.movieId).populate({ path: "producer", select: "fullName" }).exec((error, movie) => {
        if (error)
            res.status(500).json({ message: "Error while getting a movie", error });
        else
            res.status(200).json(movie);
    });
});

// Update a movie details
app.patch("/movie", (req, res) => {
    const updateQuery = {
        $set: {
            name: req.body.name,
            relYear: req.body.relYear,
            producer: req.body.producer,
            actors: req.body.actors
        }
    };

    Movie.findByIdAndUpdate(req.body._id, updateQuery, { upsert: true, new: true })
        .exec((error, movieObj) => {
            if (error)
                res.status(500).json({ message: "Error while updating a movie", error });
            else
                res.status(200).json(movieObj);
        });
});

// Create new movie document
app.post("/movie", (req, res) => {
    const newMovie = new Movie({
        name: req.body.name,
        relYear: req.body.relYear,
        producer: req.body.producer,
        actors: req.body.actors
    });

    newMovie.save(error => {
        if (error)
            res.status(500).json({ message: "Error while creating a movie", error });
        else
            res.status(200).json(newMovie);
    });
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/practice", (error) => {
    if (!error)
        console.log("DB Connected!");
});

// Server connection
app.listen(4700, () => {
    console.log("Server running at 4700!");
});