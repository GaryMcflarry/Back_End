const express = require('express');
const router = express.Router();

// Handling get requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /clients'
    })
});

// Handling Post requests
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        surname: req.body.surname,
        contactNr: req.body.contactNr
    };
    res.status(201).json({
        message: 'Handling post requests to /clients',
        createdProduct: product,

    })
});

// Handling get requests by their IDs
router.get('/:clientId', (req, res, next) => {
    const id = req.params.clientId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id : id
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

// Handling patch requests by their IDs
router.patch('/:clientId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

// Handling delete requests by their IDs
router.delete('/:clientId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;