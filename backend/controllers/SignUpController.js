import Signup from "../models/SignupSchema.js";
import bcrypt from 'bcrypt';

let Fetchuser = async(req, res)=>{
    try {
        let result = await Signup.find();
        res.send(result);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
let FetchuserById = async(req, res)=>{
    try {
        let result = await Signup.find({_id : req.params.id });
        res.send(result);
    } catch (err) {
        console.error('Error fetching user by id:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
let Saveuser = async(req, res)=>{
    try {
        delete req.body.repassword;
        if (!req.body.password) {
            return res.status(400).json({ success: false, error: 'Password is required' });
        }
        const saltRounds = 10;
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        let result = await Signup.create(req.body);
        res.status(201).json({ success: true, result });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
let Updateuser = async(req, res)=>{
    try {
        let result = await Signup.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!result) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, result });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
let Deleteuser = async(req, res)=>{
    try {
        let result = await Signup.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, result });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export {Fetchuser,FetchuserById,Saveuser,Updateuser,Deleteuser}
// Compare this snippet from backend/models/SignupSchema.js:;