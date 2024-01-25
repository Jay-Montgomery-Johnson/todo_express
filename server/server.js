const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const bp = require('body-parser');
const { auth } = require('express-oauth2-jwt-bearer');
const app = express();
const db = require('./db/connection');

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG
});

app.set('view engine', 'ejs');
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(jwtCheck);

app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      return res.status(401).send({ msg: "Invalid token" });
    }
  
    next(err, req, res);
  });

app.get('/list', (req, res) => {
    let userId = req.auth.payload.sub;
    db.querySelectLists(userId).then((result) => {
        //console.log(result.rows);
        console.log('lists');
        res.json({lists:result.rows});
    });

    //res.json({"lists":[{listId:"1", listName:"liserver2", items:[{itemId:"1", itemName:"a",completed:false},{itemId:"2", itemName:"b",completed:false},{itemId:"3", itemName:"c",completed:false}]},
    //{listId:"2", listName:"listB", items:[{itemId:"1", itemName:"d",completed:false},{itemId:"2", itemName:"z",completed:false}]}]});
});

app.get('/items', (req, res) => {//
    let userId = req.auth.payload.sub;
    let listId = req.headers.id;
    db.querySelectListItems(listId, userId).then((result) => {
        res.json({lists: result.rows});
    });
});

app.get('/max_id', (req, res) => {
    db.queryMaxItemId(req.headers.id).then((result) => {
        res.json({maxId: result.rows});
    });
});

app.post('/complete', (req, res) => {
    let userId = req.auth.payload.sub;
    console.log('complete: !!');
    db.queryCompleteItem(req.body.listId, req.body.itemId, userId, req.body.completed);
    res.send('completed');
});

app.post('/delete', (req, res) => {
    let userId = req.auth.payload.sub;
    db.queryDeleteItem(req.body.listId, userId, req.body.itemId);
    res.send('deleted');
});

app.post('/delete_lists', (req, res) => {
    let listId = req.body.listId;
    let userId = req.auth.payload.sub;
    db.queryDeleteList(listId, userId);
    res.send('deleted');
});

app.post('/new_todo', (req, res) => {
    let listId = req.body.listId;
    let userId = req.auth.payload.sub;
    let itemName = req.body.text;
    if ('text' in req.body || 'listId' in req.body) {
        db.queryNewItem(listId,  userId, itemName);
    } else {
        console.log('incomplete todo');
    }
    res.send(req.body);
});

app.post('/new_list', (req, res) => {
    let listName = req.body.name;
    let userId = req.auth.payload.sub;
    console.log('new list');
    db.queryNewList(listName, userId);
    res.send(req.body);
});

app.post('/delete_list', (req, res) => {
    let listId = req.body.listId;
    let userId = req.auth.payload.sub;
    console.log('delete list');
    db.queryDeleteList(listId, userId);
    res.send(req.body);
});

//user routing
const userRouter = require('./routes/users.js');
app.use('/users', userRouter);
//end of the user route...

app.listen(8080);

