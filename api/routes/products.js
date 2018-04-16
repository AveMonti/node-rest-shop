const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req,res,next) => {
    const product = {
      name : req.body.name,
      price: req.body.price
    };
    res.status(201).json({
    message: 'Handling POST requests to /products',
        product
});
});

router.get('/:productID',(req,res,next) => {
    const id = req.params.productID;
    if(id === 'special'){
        res.status(200).json({
            message: 'You set special id',
            id : id
        });
    }else{
        res.status(200).json({
           message : 'other id'
        });
    }
});


router.patch('/:productID',(req,res,next) => {
    res.status(200).json({
        message : 'Update product'
    });
});

router.delete('/:productID',(req,res,next) => {

    res.status(200).json({
    message : 'Delete product'
});
});

module.exports = router;