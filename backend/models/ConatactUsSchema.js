import mongoose from '../config/conn.js'

let ContactusSchema = mongoose.Schema({
    name : String,
    email : String,
    message : String,
}, {timestamps:true})

let Signup = mongoose.model("Contact", ContactusSchema);

export default ContactusSchema;