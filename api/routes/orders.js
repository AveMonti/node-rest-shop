const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
  const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId
  });
  order
  .save()
  .then( result => {
    console.log(resoult)
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
        error: err
    })
  });
});

router.get('/orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Order details',
    orderID: orderID
  });
});


router.delete('/orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Order deleted',
    orderID: orderID
  });
});

module.exports = router;
