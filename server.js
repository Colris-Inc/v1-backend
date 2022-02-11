const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3001


app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI

mongoose.connect(uri);
const UserModel = require('./models/users')

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const new_user = new UserModel(user);
    await new_user.save();
    res.json(user);
});

app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => {
    console.log("Server running on port 3001")
});