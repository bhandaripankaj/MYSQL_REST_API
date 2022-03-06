var express = require('express');
const apiRouter = express.Router();
import {addMedia} from '../generic/index'

const productRouter = require("../controller/product/router")
const categoryRouter = require("../controller/category/router")



apiRouter.use('/product', productRouter)
apiRouter.use('/category', categoryRouter)

// multer api for product image
apiRouter.post('/image/upload',addMedia)

module.exports = apiRouter;