const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MovieSchema = new Schema({
    name: { type: String, required: true },
    relYear: { type: String, required: true },
    producer: { type: ObjectId, ref: "User" },
    actors: [{ type: ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Movie", MovieSchema);