const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('users');
});

router.route('/new', (req, res) => {
    res.send('users new form');
});

//a single route with multiple requests 
//runs the code from the clients request
router.route('/:id')
    .get((req, res) => {
        console.log(req.user);
        res.send(`Get User With ID ${req.params.id}`);
    })
    .post((req, res) => {
        res.send(`Update User With ID ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete User With ID ${req.params.id}`);
    });

const users = [{name: 'Harry'}, {name: 'James'}];
router.param('id', (req, res, next, id) => {
    req.user = users[id];
    next(); //since param runs first the next() function tells the browser where to go next..
});

module.exports = router;