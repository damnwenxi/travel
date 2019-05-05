const mysql = require('mysql');
const co = require('co-mysql');
const config = require('../config');

let connection = mysql.createPool(config.MYSQL);
module.exports = co(connection);

// module.exports.connect=(sql,param,callback)=>{
//     const db = mysql.createConnection(config.MYSQL);
//     db.connect((err)=>{
//         if(err){
//             console.log("database error:"+err);
//             return;
//         }
//         console.log("database is connected.");
//     });
//     db.query(sql,param,callback);
//     db.end();
// };