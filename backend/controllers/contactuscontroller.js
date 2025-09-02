import Contact from "../models/ConatactUsSchema.js";

let FetchContact = async(req, res)=>{
    try {
        let result = await Contact.find();
        res.send(result);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

let SaveContact = async(req, res)=>{
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }
    try {
        let result = await Contact.create({ name, email, message });
        res.status(201).json({ success: true, result });
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export {FetchContact, SaveContact};
