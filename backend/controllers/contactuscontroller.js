import ContactusSchema from "../models/ConatactUsSchema.js";

let FetchContact = async(req, res)=>{
    let result = await ContactusSchema.find();
    res.send(result);
}

let SaveContact = async(req, res)=>{
    let result = await ContactusSchema.create(req.body);
    res.send({success: true, result});
}

export {FetchContact, SaveContact};
