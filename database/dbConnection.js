const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res => {
    console.log("Connected to mongoDB");

}).catch(err => {
    console.log("MongoDB connection failed ");
    console.log(err);
})