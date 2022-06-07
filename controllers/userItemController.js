var express = require('express');
var router = express.Router();
var ErrorHanlder = require('../models/error-class');
var HttpStatus = require('http-status-codes');

const userItemManager = require('../managers/userItemManager');

router.get('/getUserItems', (req, res,next) => {
    res.status(HttpStatus.OK).json({ data: req.query});
    userItemManager.getUserItems(req.query)
      .then(result => {
          //res.status(HttpStatus.OK).json({ data: req.query});
        /*if (result.output.success) res.status(HttpStatus.OK).json({ data: result.recordset});
        else return next(new ErrorHanlder('', HttpStatus.BAD_REQUEST));*/
      })
      .catch(err => {
        return next(new ErrorHanlder(err.message, HttpStatus.INTERNAL_SERVER_ERROR));
      })
});

router.post('/createUserItem', (req, res,next) => {
    exampleManager.exampleFunct(req.query)
        .then(result => {
            if (result.output.success) res.status(HttpStatus.OK).json({ data: result.recordset});
            else return next(new ErrorHanlder('', HttpStatus.BAD_REQUEST));
        })
        .catch(err => {
            return next(new ErrorHanlder(err.message, HttpStatus.INTERNAL_SERVER_ERROR));
        })
});

module.exports = router;
