const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONCAT

mongoose.connect(mongo_url)
    .then(() => {
        console.log("DataBase connected.........");
    }).catch((err) => {
        console.log("MongoDb Conaction error", err);
    })