const express = require('express');
const path= require('path');
const router = express.Router();

const controllerProducts= require("../controller/shop");
// Routes



router.get('/products', controllerProducts.getProductsAll);








module.exports=router;