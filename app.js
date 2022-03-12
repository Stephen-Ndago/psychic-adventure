const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')
dotenv.config({path: "./config/dotenv.env"});
const User = require("./models/user");
const { errorHandler } = require("./middleware/error");

// EXPRESS APP INITIATION
const app = express();

// THIRD-PARTY MIDDLEWARES
/*These are external middlewares downloaded from happy sources*/
app.use(morgan('dev')); 
app.use(express.json());

// CUSTOM MIDDLEWARES 
/* These middlewares are basically re-directing routes */
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));


app.all("*", (req, res) => {
const port = process.env.PORT
res.status(404).json({
status: "failed",
message: `There is no resource found at ${req.protocol}//:${req.hostname}:${port}${req.originalUrl}`
});
});

app.use(errorHandler)


module.exports = app;