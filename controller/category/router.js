var express = require('express');
import categoryController from './controller'
const categoryRouter = express.Router();

categoryRouter.post('/create',categoryController.create)
categoryRouter.get('/get',categoryController.getAllCategory)
categoryRouter.delete('/delete/:id',categoryController.delete)
categoryRouter.put('/update/:id',categoryController.update)



// get product data and subCategory data by category id
categoryRouter.get('/get-categore-subcategory-product/:id',categoryController.getCategoryWithProduct)




module.exports = categoryRouter;