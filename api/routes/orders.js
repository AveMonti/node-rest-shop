const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = 


router.get('/', (req, res, next) => {
  Order.find()
  .select('Product quantity _id')
  .exec()
  .then( docs => {
    res.status(200).json({
      count: docs.length,
      orders: docs.map( doc =>{
        return {
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: 'GET',
            url:  'http://localhost:3000/order/' + doc._id
          }
        }
      }),

    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post('/', (req, res, next) => {

  const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      productId: req.body.productId
  });
  order
  .save()
  .then( result => {
    console.log(result)
    res.status(201).json({
      message: 'Order stored',
      createdOrder:{
        id: result._id,
        quantity: result.quantity,
        productId: result.productId
      },
      request: {
          type: 'GET',
          url:  'http://localhost:3000/order/' + result._id
      }
    });
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
