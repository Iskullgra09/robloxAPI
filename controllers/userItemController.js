var express = require('express');
var router = express.Router();
var ErrorHanlder = require('../models/error-class');
var HttpStatus = require('http-status-codes');
var mysql = require('mysql');
var mysqlconfig = require('../connectionMySQL/config');
const { makeDb } = require('mysql-async-simple');

router.get('/getUserItems', async(req, res,next) => {

    let connection = mysql.createConnection(mysqlconfig);
    const db = makeDb();
    await db.connect(connection);

    try {
        const usersItems = await db.query(connection, 'CALL getUserItems(?)', [req.query.userID]);
        console.log(usersItems)
        res.status(HttpStatus.OK).json({ data: usersItems[0], success: true});
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ data: 'Error al obtener', success: false});
    } finally {
        await db.close(connection);
    }
});

router.post('/createUserItem', async(req, res,next) => {
    let connection = mysql.createConnection(mysqlconfig);
    const db = makeDb();
    await db.connect(connection);

    try {
        const usersItems = await db.query(connection, 'CALL createUserItem(?,?,?)', [req.body.userID, req.body.itemID, req.body.itemXP]);
        res.status(HttpStatus.OK).json({success: true});
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ data: 'Error al crear', success: false});
    } finally {
        await db.close(connection);
    }
});

router.put('/modifyUserItem', async(req, res,next) => {
    let connection = mysql.createConnection(mysqlconfig);
    const db = makeDb();
    await db.connect(connection);

    try {
        const usersItems = await db.query(connection, 'CALL modifyUserItem(?,?)', [req.body.ID, req.body.itemXP]);
        res.status(HttpStatus.OK).json({success: true});
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ data: 'Error al modificar', success: false});
    } finally {
        await db.close(connection);
    }
});

router.delete('/deleteUserItem', async(req, res,next) => {
    let connection = mysql.createConnection(mysqlconfig);
    const db = makeDb();
    await db.connect(connection);

    try {
        const usersItems = await db.query(connection, 'CALL deleteUserItem(?)', [req.body.ID]);
        res.status(HttpStatus.OK).json({success: true});
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ data: 'Error al borrar', success: false});
    } finally {
        await db.close(connection);
    }
});

module.exports = router;
