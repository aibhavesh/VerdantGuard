import bcrypt from 'bcrypt';
import Signup from '../models/SignupSchema.js';
import jwt from 'jsonwebtoken'


let SigninAuth = async(req, res)=>{
    try {
        let {email, password} = req.body;
        const result = await Signup.find({email: email});
        if (result.length === 1) {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                let obj = {id: user._id, email: user.email};
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    console.error('JWT_SECRET not set in environment');
                    return res.status(500).json({ success: false, error: 'Server misconfiguration' });
                }
                let token = jwt.sign(obj, jwtSecret);
                return res.send({success: true, token: token, name: user.name});
            }
        }
        // Generic error for both wrong email and password
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    } catch (err) {
        console.error('Error in SigninAuth:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }

}

export default SigninAuth;