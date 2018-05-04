const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {

  const order = {
    productID: req.body.productID,
    quantity: req.body.quantity
  };

  res.status(201).json({
    message: 'Order was created'
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
