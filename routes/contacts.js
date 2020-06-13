const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
    res.send("contacts");
});

router.get('/:id', (req, res, params) => {
    res.send("contacts");
});

router.post('/', (req, res) => {
    res.send("contacts");
});


router.put('/:id', (req, res, params) => {
    res.send("contacts");
});

router.delete('/:id', (req, res, params) => {
    res.send("contacts");
});



module.exports = router;