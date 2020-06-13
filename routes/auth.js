const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');

router.get('/', (req, res) => {
    res.send("auth")
});

router.post('/', [
    check('email', 'please provide a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
  
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600000,
  
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    } catch(err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});



module.exports = router;