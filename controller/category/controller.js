const Sequelize = require('sequelize');
import{ 
    categorie,
    product_image
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
    // add category api
  async create (req, res) {
        try{
             req.body.name = req.body.name.toLowerCase()
            //  check unique name
            const nameAlready = await categorie.findOne({
              where:  {name:req.body.name}
            })
              if(nameAlready){
                return res.json({
                    code: 400,
                    message: "Category is already exist.",
                })
              }
              if(!req.body.image_url){
                return res.json({
                    code: 400,
                    message: "Image is a required field",
                })
              }
            // create slug value
            req.body.slug = slugify(req.body.name)
            req.body.image_url = process.env.BASE_URL+"images/"+req.body.image_url

            const addCategory = await categorie.create(req.body)
            if(addCategory){
                return res.json({
                    code: 200,
                    message: "Category add successfully.",
                    data:addCategory
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
    // get all category api
    async getAllCategory(req, res) {
        try {
            const getCategory = await categorie.findAll({})
            if (getCategory.length) {
                return res.json({
                    code: 200,
                    message: "Category get successfully.",
                    data: getCategory
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
    // delete category
    async delete(req,res){
        try {
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
            const dltCategory = await categorie.destroy({
                where: {
                    id: req.params.id
                }
            })
            if(dltCategory){
                return res.json({
                    code: 200,
                    message: "Category delete successfully.",
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
    // update category api
    async update (req,res){
        try {
             //  check categoryId id in table
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
             req.body.name = req.body.name.toLowerCase()
             // create slug value
            req.body.slug = slugify(req.body.name)
            
            if(req.body.image_url){
                req.body.image_url = process.env.BASE_URL+"images/"+req.body.image_url
            }
            const updtCategory = await categorie.update(req.body,{
                where: {
                    id: req.params.id
                }
            })
            if(updtCategory){
                return res.json({
                    code: 200,
                    message: "Category update successfully.",
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

    // get product and subcategory api
    async getCategoryWithProduct(req, res) {
        try {
            // get product by category id
            const getProduct = await sequelize.query(`SELECT product_categories.product_id,products.sku,products.price,
            products.name,product_images.image_url,products.createdAt
            FROM product_categories
            RIGHT JOIN products ON product_categories.product_id = products.id
            RIGHT JOIN product_images ON products.id = product_images.product_id
            where product_categories.category_id = ${req.params.id}
            `, {
                replacements: [],
                nest: true,
                type: QueryTypes.SELECT,
            })

            // get subCategory by category
            const getSubcategory = await sequelize.query(`SELECT subcategory.id,subcategory.name,subcategory.image_url,
            parentCategory.parent_category_id,subcategory.description,subcategory.createdAt,subcategory.parent_category_id

            FROM categories as subcategory 
            INNER JOIN categories as parentCategory ON parentCategory.id = subcategory.parent_category_id
            where subcategory.parent_category_id = ${req.params.id}
            `, {
                replacements: [],
                nest: true,
                type: QueryTypes.SELECT,
            })
            if (getProduct.length) {
                return res.json({
                    code: 200,
                    message: "Product and category get successfully.",
                    data: {product:getProduct,subCategory:getSubcategory}
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
  }