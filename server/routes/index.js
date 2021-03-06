'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color,
    mileage: req.body.mileage,
    price: req.body.price
  });
  res.json({ message: 'success' });
});

router.delete('/', function(req, res) {
  data = data.filter(function(car) {
    return car.plate !== req.body.plate;
  });
  res.json({ message: 'success' });
});

module.exports = router;
