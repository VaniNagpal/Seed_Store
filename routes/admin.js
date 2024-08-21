const express = require('express');
const path= require('path');
const router = express.Router();

const controllerProducts= require("../controller/admin");
// Routes
router.get('/',controllerProducts.getAdminPage)
router.get('/products/add', controllerProducts.getProductAdd);

router.get('/products/all', controllerProducts.getProductsAll);
router.get('/product/update/:id',controllerProducts.getupdateProduct)
router.get('/product/delete/:id', controllerProducts.getProductDelete);



router.post('/products/add', controllerProducts.postProductAdd);
router.post('/products/update',controllerProducts.postupdateProduct)



module.exports=router;