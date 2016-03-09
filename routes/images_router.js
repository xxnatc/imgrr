const express = require('express');
const jsonParser = require('body-parser').json();

const dbErrorHandler = require(__dirname + '/../lib/db_error_handler');
const Image = require(__dirname + '/../models/image');

var imagesRouter = module.exports = exports = express.Router();

imagesRouter.get('/images', (req, res) => {
  Image.find({}, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

imagesRouter.post('/images', jsonParser, (req, res) => {
  var newImage = new Image(req.body);
  newImage.save((err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});
