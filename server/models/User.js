const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    type: { type: String, required: true },
    movies: [{ type: ObjectId, ref: "Movie" }],
    dob: Date,
    gender: String,
    bio: String
});

module.exports = mongoose.model("User", UserSchema);