const app =  require('../app');
const express = require("express");
const { signup, signin } = require("../controllers/auth");


const router = express.Router();

router.post("/", signin);
router.post("/signup", signup)



module.exports = router;