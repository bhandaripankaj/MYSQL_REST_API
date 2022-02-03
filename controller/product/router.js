var express = require('express');
import productController from './controller'
const productRouter = express.Router();

productRouter.post('/create',productController.create)
productRouter.delete('/delete/:id',productController.delete)
productRouter.get('/get/:id',productController.getProductById)
productRouter.put('/update/:id',productController.update)


// get all products
productRouter.get('/get-all',productController.getAllProduct)

// add product category
productRouter.post('/add-product-category',productController.addCategoryProduct)


module.exports = productRouter;