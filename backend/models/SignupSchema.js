import mongoose from '../config/conn.js'

let SignupSchema = mongoose.Schema({
    name : String,
    contact :String,
    email : String,
    username : String,
    password : String,
    address : String,
}, {timestamps:true})

let Signup = mongoose.model("signup", SignupSchema);

export default Signup;