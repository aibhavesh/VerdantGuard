import mongoose from '../config/conn.js'

const ContactusSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", ContactusSchema);

export default Contact;