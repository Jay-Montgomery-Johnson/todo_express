
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'nickpas',
    host: 'localhost',
    database: 'todo_list',
    password: 'localhost',
    port: 5432,
});
//res.json({"lists":[{listId:"1", listName:"liserver2", items:[{itemId:"1", itemName:"a",completed:false},
//{itemId:"2", itemName:"b",completed:false},{itemId:"3", itemName:"c",completed:false}]},

const queryCreateToDoTable = `
    CREATE TABLE IF NOT EXISTS todos (
    id serial NOT NULL,
    listId INT NOT NULL,
    itemId INT NOT NULL,
    itemName varchar(80) NOT NULL,
    completed BOOL,
    PRIMARY KEY (id)
    );`;

const queryCreateListTable = `
    CREATE TABLE IF NOT EXISTS lists (
        listId INT NOT NULL,
        listName varchar(20) NOT NULL,
        PRIMARY KEY (listId)
    );
    `;

function queryNewItem(listId, listName, itemId, itemName, completed) {
    pool.query(`
        INSERT INTO todo_lists(listId, listName, itemId, itemName, completed)
        VALUES(${listId}, '${listName}', ${itemId}, '${itemName}', ${completed});
    `);
    
}

function queryCompleteItemTrue(listId, itemId) {
    return pool.query(`UPDATE todo_lists
    SET completed=TRUE
    WHERE listId=${listId} AND itemId=${itemId};
    `);
}

function queryCompleteItemFalse(listId, itemId) {
    return pool.query(`UPDATE todo_lists
    SET completed=FALSE
    WHERE listId=${listId} AND itemId=${itemId};
    `);
}

function queryDeleteItem(listId, itemId) {
    return pool.query(`DELETE FROM todo_lists
    WHERE listId=${listId} AND itemId=${itemId};
    `);
}
//-------------
let querySelectLists = function() {
    return pool.query('SELECT * FROM lists;').then((result) => {return result});
}  

let querySelectListItems = function(listId) {
    return pool.query(`SELECT * FROM todos WHERE listId=${listId};`).then((result) => {return result});
}
//--------------
pool.connect();
    
pool.query(queryCreateToDoTable);
pool.query(queryCreateListTable);

//pool.query(`INSERT INTO todo_lists(listId, listName, itemId, itemName, completed) VALUES(1, 'fff', 3, 'fdfdf', true);`);
//pool.query('SELECT * FROM todo_lists;').then(function success(result) {
//    /* do something useful with your result */
//    console.log(result.rows)
//});
//console.log('data: '+x);
pool.query('DROP TABLE todo_lists');
//await pool.end();

module.exports= {pool, q, queryGetLists};