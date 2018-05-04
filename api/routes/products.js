const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
          product: docs.map(doc => {
            return{
              name: doc.name,
              price: doc.price,
              id: doc._id,
              request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + doc._id
              }
            }
          })
      }
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Create product succesfuly ",
        createdProduct: {
          name: result.name,
          price: result.pric,
          id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
    .select('_id name price')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            description: 'Get_All_Products',
            url: 'http://localhost:3000/products/'
          }
        });
      } else {
        res.status(400).json({
          message: "No valid entry found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});


router.patch('/:productID', (req, res, next) => {
  const id = req.params.productID;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({
      _id: id
    }, {
      $set: updateOps
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product_Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.remove({
      _id: id
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted corectly',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products/',
          body: {name: 'Number', price: 'Number'}
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
