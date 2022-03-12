const User = require("../models/user");
const Err = require("../util/Error");

module.exports.signup =  async (req, res, next) => {

    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        
        user.password = undefined;
        user.active = undefined;
        
        res.status(201).json({
            success: true,
            user,
        })
        next()
    } catch (err) {
        res.send(err);
    }
}

module.exports.signin = async (req, res, next) => {
    const {email, password} = req.body     
    
    try {
        const user = await User.findOne({email}).select("+password");
            
        if (!user || !(await user.passwordChecked(password))) {
            console.log("TRUE");
            return next(new Err("Invalid credentials", 403));
            
        }
        console.log("hey");
        // Delete hash before sent to the end user
        user.password = undefined;

        res.status(202).json({
            success: true ,
            user
        })
        next()
    } catch (err) {
        next(new Err(err.message, err.statusCode))
    }
}