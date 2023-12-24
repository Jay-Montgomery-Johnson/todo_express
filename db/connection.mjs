import  pg from 'pg';

const client = new pg.Client({
    user: 'nickpas',
    host: 'localhost',
    database: 'todo_list',
    password: 'localhost',
    port: 5432,
});
   
await client.connect();
console.log('---!---');
let request = await client.query('SELECT * FROM todo_items;');
console.log(request.rows)
   
await client.end();