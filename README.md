##### Package

### $ npm init
### $ npm install -- save express
### $ npm install -- save-dev nodemon   // restart server everytime when you change something
* if u wanna use nodemon u mast add on package.json

 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "nodemon server.js"
  },

  and press comand in your console "npm start"

### $ npm install --save morgan   // login package to use NEXT?
## how to use? :

* go to app.js and add
const morgan = require('morgan');
app.use(morgan('dev'));

* now when we are use any request we can see more information like:
** DELETE /products/123 200 3.315 ms - 28
** POST /products 201 0.316 ms - 49

### npm install --save body-parser // for parse response
## how to use?
* add to app.js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
* on route

router.post('/', (req,res,next) => {
    const product = {
      name : req.body.name,
      price: req.body.price
    };
    res.status(201).json({
    message: 'Handling POST requests to /products'
});
});


### npm install mongoose



### Get all product
* GET
* http://localhost:3000/products/

### Get product with id 123
* GET
* http://localhost:3000/products/123


### Patch product with id 123
* PATCH
* http://localhost:3000/products/123
[
	{"propName": "name", "value": "Hello"}
]


### Delete product with id 123
* DELETE
* http://localhost:3000/products/123

### Set id
* POST
* http://localhost:3000/products/


## Start on local server:
* $ mongod --port 27020 --dbpath workspace/web/node-rest-shop/data/db/
* $ npm start
