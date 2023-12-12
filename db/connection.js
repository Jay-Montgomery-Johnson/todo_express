const pg = require('pg');

const pool = new Pool();
 
export const select = async (req, res, next) => { 
    const data = pool.query(
    "SELECT * FROM users;"
  );
  return data;
};
