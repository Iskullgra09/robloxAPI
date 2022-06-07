const mysql = require('mysql');
var mysqlconfig = require('./config');
let dbConnPool = null;

const getPoolConnection = () => {
    if (dbConnPool) return dbConnPool;
    dbConnPool = new Promise((resolve, reject) => {
        const conn = new mysql.createPool(mysqlconfig);

        conn.getConnection(function(err, connection) {
            if (err) {
                console.log('error:' + err.message);
                return reject(err.message)
            }
            console.log("mySQL connected.");
            return resolve(connection)

        });
    });
    return dbConnPool;
}
module.exports = { mysql, getPoolConnection };
