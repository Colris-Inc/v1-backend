const express = require("express");
const app = express();
const mongoose = require("mongoose");

require('dotenv').config();

const uri = process.env.ATLAS_URI

mongoose.connect(uri);
const UserModel = require('./models/users')

app.get("/get_users", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});


app.listen(3001, () => {
    console.log("Server running on port 3001")
});