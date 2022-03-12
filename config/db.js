const mongoose = require("mongoose");

const mongo_uri = process.env.MONGO_URI.replace("<password>", process.env.USER_PSSD).replace('myFirstDatabase', 'carCare');

const connectDB = async function() {
    try {
        const conn = await mongoose.connect(mongo_uri)
        console.log(`Datebase successfully connecteed @ ${conn.connection.host}`.bgCyan);
    } catch (err) {
        console.log(err.message);
        process.exit(0);
    }
}

module.exports = connectDB;