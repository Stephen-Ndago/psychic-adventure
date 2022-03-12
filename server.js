const colors = require("colors");
const app = require("./app")
const connectDB = require('./config/db');
connectDB()
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Hey! Server running on port ${PORT}`.underline.yellow));