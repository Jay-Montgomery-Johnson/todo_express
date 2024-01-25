const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'todo_list',
    host: 'localhost',
    database: 'todo_app',
    password: 'password',
    port: 5432,
});

const queryCreateToDoTable = `
    CREATE TABLE IF NOT EXISTS todos (
        id serial NOT NULL,
        listId INT NOT NULL,
        itemId SERIAL,
        userId varchar(250) NOT NULL,
        itemName varchar(80) NOT NULL,
        completed BOOL,
        PRIMARY KEY (id)
    );`;

const queryCreateListTable = `
    CREATE TABLE IF NOT EXISTS lists (
        listId SERIAL NOT NULL,
        userId varchar(250) NOT NULL,
        listName varchar(20) NOT NULL,
        PRIMARY KEY (listId)
    );
    `;

const queryCreateUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        userId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userAuthId varchar(20) NOT NULL,
        email varchar(100),
        name varchar(50),
        nickname varchar(50)
    );
    `;

//-------------
let querySelectLists = function(userId) {
    return pool.query(`SELECT * FROM lists WHERE userId='${userId}';`).then((result) => {return result});
}  

let querySelectListItems = function(listId, userId) {
    return pool.query(`SELECT * FROM todos WHERE listId=${listId} AND userId='${userId}' ORDER BY itemId ASC;`).then((result) => {return result});
}

function queryDeleteItem(listId, userId, itemId) {
    return pool.query(`DELETE FROM todos
    WHERE listId=${listId} AND itemId=${itemId} AND userId='${userId}';
    `);
}

function queryCompleteItem(listId, itemId, userId, boolValue) {
    return pool.query(`UPDATE todos
    SET completed=${boolValue}
    WHERE listId=${listId} AND itemId=${itemId} AND userId='${userId}';
    `);
}

function queryNewItem(listId, userId, itemName) {
    return pool.query(`
        INSERT INTO todos(listId, itemName, userId, completed)
        VALUES(${listId}, '${itemName}', '${userId}', false);
    `);
}

function queryMaxItemId(listId) {
    return pool.query(`
        SELECT(itemId) FROM todos
        ORDER BY itemId DESC
        LIMIT 1;
    `);   
}

function queryNewList(listName, userId) {
    return pool.query(`
        INSERT INTO lists(userId, listName)
        VALUES('${userId}', '${listName}');
    `);
}

function queryDeleteList(listId, userId) {
    return pool.query(`DELETE FROM lists
    WHERE userId='${userId}' AND listId=${listId};
    `);
}
//--------------
pool.connect();
pool.query(queryCreateToDoTable);
pool.query(queryCreateListTable);
pool.query(queryCreateUserTable);

module.exports= {pool, querySelectLists, querySelectListItems, queryDeleteItem, queryNewItem, queryMaxItemId, queryCompleteItem, queryDeleteList, queryNewList};