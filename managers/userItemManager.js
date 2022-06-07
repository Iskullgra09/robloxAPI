var mysql = require('mysql');
var mysqlconfig = require('../connectionMySQL/config');

exports.getUserItems = async (req) => {
    try {

        let connection = mysql.createConnection(mysqlconfig);

        let sql = "CALL getUserItems(?)";

        connection.query(sql, req.userID, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results);
            console.log(fields);
            return results;
        });

    } catch (err) {
        throw err;
    }
}
