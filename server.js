const express = require('express');
const select = require('./db/connection.js')
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('Here');
    res.render("index", {text:"world"});
});

const userRouter = require('./routes/users.js');

app.use('/users', userRouter);

app.listen(3000);

