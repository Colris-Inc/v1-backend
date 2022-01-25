const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')

app.use(express.json());
app.use(cors());

require('dotenv').config();

const uri = process.env.ATLAS_URI

mongoose.connect(uri);
const UserModel = require('./models/users')

app.get("/get_user", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

app.post("/create_user", async (req, res) => {
    const user = req.body;
    const new_user = new UserModel(user);
    await new_user.save();
    res.json(user);
});

app.listen(3001, () => {
    console.log("Server running on port 3001")
});