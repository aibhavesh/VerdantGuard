import Signup from "../models/SignupSchema.js";
import sha1 from 'sha1'

let Fetchuser = async(req, res)=>{
    let result = await Signup.find();
    res.send(result);
}
let FetchuserById = async(req, res)=>{
    let result = await Signup.find({_id : req.params.id });
    res.send(result);
}
let Saveuser = async(req, res)=>{
    delete req.body.repassword;
    req.body.password = sha1(req.body.password);
    
    let result = await Signup.create(req.body);
    res.send({success: true, result});
}
let Updateuser = async(req, res)=>{
    let result = await Signup.updateMany({_id : req.params.id }, req.body);
    res.send({success: true, result});
}
let Deleteuser = async(req, res)=>{
    let result = await Signup.deleteMany({_id : req.params.id });
    res.send({success: true, result});
}

export {Fetchuser,FetchuserById,Saveuser,Updateuser,Deleteuser}
// Compare this snippet from backend/models/SignupSchema.js:;