const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');


router.get('/all', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ data: -1 });
        res.json({ contacts });
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get('/:id', (req, res, params) => {
    res.send("contacts");
});

router.post('/', 
[ 
    auth,
    check('name', 'enter a valid name').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone, 
            type,
            user: req.user.id
        });
        const contact = await newContact.save()
        res.json(contact)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


router.put('/:id', auth , async (req, res) => {
    const { name, email, type } = req.body;

    //build contact object
    const contactFields = {};
    if(name) contactFields[name] = name;
    if(email) contactFields[email] = email;
    if(phone) contactFields[phone] = phone;
    if(type) contactFields[type] = type;

    try {
        let contact = await Contact.findById(req.params.id)

        if(!contact) {
            return res.status(404).json({message: "contact not found"})
            if(contact.user.toString() !== req.user.id) {
                return res.status(401).json({ message: "not authorized" });
            }
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, {
            $set: contactFields
        }, {
            new: true
        });
        res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

router.delete('/:id', (req, res, params) => {
    res.send("contacts");
});



module.exports = router;