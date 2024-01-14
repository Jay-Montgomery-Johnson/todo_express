const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const pr = require('express-promise-router');
const app = express();
const db = require('./db/connection');
app.set('view engine', 'ejs');

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.get('/list', async (req, res, next) => {
    /*
    db.q().then((result) => {
        console.log(result.rows);
        console.log('res');
        res.json({lists:result.rows});
    });*/

    //res.json({"lists":[{listId:"1", listName:"liserver2", items:[{itemId:"1", itemName:"a",completed:false},{itemId:"2", itemName:"b",completed:false},{itemId:"3", itemName:"c",completed:false}]},
    //{listId:"2", listName:"listB", items:[{itemId:"1", itemName:"d",completed:false},{itemId:"2", itemName:"z",completed:false}]}]});
});

app.post('/complete', (req, res) => {
    console.log('complete: '+req.body);
    res.send(req.body);
});

app.post('/delete', (req, res) => {
    console.log('delete: '+req.body);
    res.send(req.body);
});



app.post('/new_todo', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

//user routing
const userRouter = require('./routes/users.js');
app.use('/users', userRouter);
//end of the user route...

app.listen(8080);

