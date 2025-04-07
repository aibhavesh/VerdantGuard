import sha1 from 'sha1'
import Signup from '../models/SignupSchema.js';
import jwt from 'jsonwebtoken'


let SigninAuth = async(req, res)=>{
    // console.log(req.body);
    let {email, password} = req.body;

    let result = await Signup.find({email : email});
    if(result.length==1) // that means email id is correct
    {
        if(result[0].password == sha1(password))
        {
            let obj = {id : result[0]._id, email : result[0].email};
            // let a = sha1("james")
            let token = jwt.sign(obj, "hello");
            res.send({success:true, token : token, name : result[0].name});
        }
        else{
            res.send({success:false, errType : 2})
        }
    }
    else{  // that means email id is NOT correct
        res.send({success:false, errType : 1})
    }

}

export default SigninAuth;