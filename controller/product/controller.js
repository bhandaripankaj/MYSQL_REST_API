const Sequelize = require('sequelize');
import{ 
    product,
    product_image,
    product_categorie,
    categorie
} from '../../models'
import models from "../../models";
import slugify from 'slugify';
import { get } from 'express/lib/response';
var sequelize = models.sequelize;
const {
    QueryTypes,
    Op
  } = require("sequelize");


export default {
    // add product api
  async create (req, res) {
        try{
              if(!req.body.image){
                return res.json({
                    code: 400,
                    message: "Image is a required field",
                    data:addProduct
                })
              }
            // unique sku number generate
            const sku = Math.floor(Math.random() * 100)
            // create slug value
            req.body.slug = slugify(req.body.name)
            req.body.sku = sku
            const addProduct = await product.create(req.body)
            if(addProduct){
                // save product image with base url in database
                await product_image.create({
                    image_url:process.env.BASE_URL+"images/"+req.body.image,
                    product_id:addProduct.id
                })
                return res.json({
                    code: 200,
                    message: "Product add successfully.",
                    data:addProduct
                })
            }else{
                return res.json({
                    code: 400,
                    message: "Invalid data."
                })
            }
        } catch (err) {
            console.log("====err",err)
            return res.json({
                code: 500,
                message: "Something Went Wrong."
            })
        }
    },
     // get all product with image  api
     async getProductById(req, res) {
        try {
            // using sql query
            const getProduct = await sequelize.query(`SELECT products.id , products.sku,products.price,
            products.name,product_images.image_url,products.createdAt 
            FROM products 
             RIGHT JOIN product_images ON products.id = product_images.product_id
             WHERE products.id = ${req.params.id} ORDER BY  createdAt DESC
            `, {
                replacements: [],
                nest: true,
                type: QueryTypes.SELECT,
            })
            if (getProduct.length) {
                return res.json({
                    code: 200,
                    message: "Product get successfully.",
                    data: getProduct
                })
            } else {
                return res.json({
                    code: 404,
                    message: "Data not found",
                    data: {}
                })
            }
        } catch (err) {
            console.log("====err", err)
            return res.json({
                code: 500,
                message: "Something Went Wrong."
            })
        }
    },
    async update (req, res) {
        try{
            //  check product id in table 
            const checkProductId = await product.findOne({
                where:{
                    id:req.params.id
                }
            })
            if(!checkProductId){
                return res.json({
                    code: 400,
                    message: "Incorrect ProductId."
                })
            }
            // create slug value
            req.body.slug = slugify(req.body.name)
            const updateProduct = await product.update(req.body,{
                where: {
                    id: req.params.id
                }
            })
            if(updateProduct){
                // update product image with base url in database
                if(req.body.image){
                    await product_image.update({
                        image_url:process.env.BASE_URL+"images/"+req.body.image,
                       
                    },{
                        where:{
                            product_id:req.params.id
                        }
                    })
                  }
                return res.json({
                    code: 200,
                    message: "Product update successfully.",
                    data:{}
                })
            }else{
                return res.json({
                    code: 400,
                    message: "Invalid data."
                })
            }
        } catch (err) {
            console.log("====err",err)
            return res.json({
                code: 500,
                message: "Something Went Wrong."
            })
        }
    },
    // get all product api
    async getAllProduct(req, res) {
        try {

            // some basic filters
          const {limit,page,orderby,order} = req.query
          let defaultPage = 0
          let defaultLimit = 20
          let  defaultOrderby = "createdAt"
          let defaultOrder = "DESC"
          
          if(limit&&page){
            defaultPage = ((page - 1) * parseInt(limit))
            defaultLimit =  parseInt(limit)
          }
          if(orderby&&order){
            defaultOrderby = orderby
            defaultOrder = order
          }

            // using sql query
            const getProduct = await sequelize.query(`SELECT products.id , products.sku,products.price,
            products.name,product_images.image_url,products.createdAt 
            FROM products 
             RIGHT JOIN product_images ON products.id = product_images.product_id
             ORDER BY ${defaultOrderby} ${defaultOrder}  LIMIT ${defaultLimit} OFFSET ${defaultPage}
            `, {
                replacements: [],
                nest: true,
                type: QueryTypes.SELECT,
            })
            if (getProduct.length) {
                return res.json({
                    code: 200,
                    message: "Product get successfully.",
                    data: getProduct
                })
            } else {
                return res.json({
                    code: 404,
                    message: "Data not found",
                    data: {}
                })
            }
        } catch (err) {
            console.log("====err", err)
            return res.json({
                code: 500,
                message: "Something Went Wrong."
            })
        }
    },
    // delete product api
    async delete(req,res){
        try {
               //  check product id in table 
               const checkProductId = await product.findOne({
                where:{
                    id:req.params.id
                }
            })
            if(!checkProductId){
                return res.json({
                    code: 400,
                    message: "Incorrect ProductId."
                })
            }
            const dltProduct = await product.destroy({
                where: {
                    id: req.params.id
                }
            })
            if(dltProduct){
                return res.json({
                    code: 200,
                    message: "Product delete successfully.",
                })
            } else {
                return res.json({
                    code: 400,
                    message: "Invalid data.",
                    data: {}
                })
            }
        } catch (err) {
            console.log("====err",err)
            return res.json({
                code: 500,
                message: "Something Went Wrong."
            })
        }
    },
    // add product category api
    async addCategoryProduct (req, res) {
        try{
            //  check product id in db 
            const checkProductId = await product.findOne({
                where:{
                    id:req.body.productId
                }
            })
            if(!checkProductId){
                return res.json({
                    code: 400,
                    message: "Incorrect ProductId."
                })
            }
            //  check categoryId id in db 
            const checkCategoryId = await categorie.findOne({
                where:{
                    id:req.body.categoryId
                }
            })

            if(!checkCategoryId){
                return res.json({
                    code: 400,
                    message: "Incorrect CategoryId."
                })
            }
            
            // duplicate data check 
            const alreadyProductCategory =  await product_categorie.findOne({
                where:{
                    product_id:req.body.productId,
                    category_id:req.body.categoryId
                }
            })
            if(alreadyProductCategory){
                return res.json({
                    code: 400,
                    message: "Already exist."
                })
            }
            const productCategory = await product_categorie.create({
                product_id:req.body.productId,
                category_id:req.body.categoryId
            })
            if(productCategory){
                return res.json({
                    code: 200,
                    message: "Product category add successfully.",
                    data:productCategory
                })
            }else{
                return res.json({
                    code: 400,
                    message: "Invalid data."
                })
            }
        } catch (err) {
            console.log("====err",err)
            return res.json({
                code: 500,
                message: "Something Went Wrong."
            })
        }
    },
  }
