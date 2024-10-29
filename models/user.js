const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ejsandmongodb');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    dp: String
});

module.exports = mongoose.model("user", userSchema);