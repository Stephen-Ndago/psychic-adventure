const mongoose =  require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
firstName: {
    type: String,
    required: [true, "This section cannot be blank"]
},
lastName :{
    type: String,
    required: [true, "This section cannot be blank"]
},
fullName: String,

email :{
    type: String,
    required: [true, "This section cannot be blank"],
    // unique: [true, "This email already exist"] // Fix on production ,
    
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
    

},
password :{
    type: String,
    min: [7, "The password cannot be less than 7 characters"],
    match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/],
    required: [true, "This section cannot be blank"],
    select: false,
} ,
active: {
    type: Boolean,
    default: true,
    select: false
}
});


// MIDDLEWARES
userSchema.pre("save", function() {
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.lastName = undefined;
})

/*
Password encription 
-Using bcryptjs
*/
userSchema.pre("save", async function() {
const salt = await bcrypt.genSalt(10)
 this.password = await bcrypt.hash(this.password, salt)
});

// Compare password
userSchema.methods.passwordChecked = async function(password) {
return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;

/*
1. Add validation to the email and password
*/