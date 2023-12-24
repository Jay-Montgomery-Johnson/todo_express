const express = require('express');
const select = import('./db/connection.mjs')
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('Here');
    res.render("index", {text:"everybody"});
});

app.get('/list', (req, res) => {
    console.log('todo list');
    res.json({
        "items": [
            {"task":"Wash the dishes", "completed":"true"},
            {"task":"Walk the dog", "completed":"false"}
        ]
    });
});

app.post('/add_item', (req, res) => {

});

//user routing
const userRouter = require('./routes/users.js');
app.use('/users', userRouter);
//end of the user route...

app.listen(3000);

