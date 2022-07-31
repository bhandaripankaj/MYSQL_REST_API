var express = require('express');
const apiRouter = express.Router();
import {addMedia} from '../generic/index'
var accountSid = "AC0bdb9f50d17352d5ef931e55878d678c";
var authToken = "d03339192c2215e76d2d1077e9436635";
var servicesID = "MGf04101005dd83fc449fb91046c3209e3"
const client = require('twilio')(accountSid, authToken);

const productRouter = require("../controller/product/router")
const categoryRouter = require("../controller/category/router")



apiRouter.use('/product', productRouter)
apiRouter.use('/category', categoryRouter)

// multer api for product image
apiRouter.post('/image/upload',addMedia)
apiRouter.post('/otp',function (req,res){
  client
      .verify
      .services(servicesID)
      .verifications
      .create({
          to:`+${req.query.mobile}`,
          channel:req.query.channel
      })
      .then(data=>{
    return res.status(200).send(data)
      }).catch(err=>{
          console.log(err)
          return res.send(err)
      })
})
module.exports = apiRouter;