const express = require('express');
const path= require('path');
const router = express.Router();

const controllerProducts= require("../controller/shop");
// Routes



router.get('/products', controllerProducts.getProductsAll);

router.get('/products/:id',controllerProducts.getProductsById);

router.get('/cart', controllerProducts.getCart);
router.get('/cart/add/:id', controllerProducts.getAddToCartById);
router.get('/cart/increase/:id', controllerProducts.getIncrease);
router.get('/cart/decrease/:id', controllerProducts.getDecrease);
router.get('/cart/buy', controllerProducts.getCartBuy);
router.get('/order/history', controllerProducts.getOrderHistory);







module.exports=router;