const express = require('express');
const User = require('../models/user');

const router =  express.Router();

router.get('/', async (req, res, next )=> {
    try {
        const users = await User.find({ active: true });
        res.status(200).json({
            success: true,
            count: users.length,
            users
        })
    } catch (err) {
        console.log(err.message);
    }
})


module.exports = router;