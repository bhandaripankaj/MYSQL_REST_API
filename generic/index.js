var express = require('express')
import multer  from 'multer'


export const upload = multer({
    storage: multer.diskStorage({
        destination:function (req,file,cb) {
        cb(null, "public/images");
        },
        filename: function (req, file, cb) {

            cb(null, Date.now() + "-" + file.originalname);
        },
    })
}).single('image')

export const imageUpload = async (req,res)=>{
    try {
        const fileinfo = req.file;
        if(fileinfo == null){
            return res.send({message:"Only .png, .jpg and .jpeg format allowed!"})
        }else{
            return res.send({ message: "upload picture successfully",data:{image: fileinfo.filename} })
        }
    } catch (error) {
       return res.send({message:"Something Went wrong"}) 
    
    }
}

export const addMedia = async (req,res)=>{
    var storage = multer.diskStorage({
        destination:function(req,files,cb){
            cb(null,"public/images")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname + Date.now()+file.originalname)
        }
    })
    const upload = multer({
        storage:storage
    }).any()
    upload(req,res, function(err){
        if(err){
            res.send(err)
        }
        return res.json({
            message:"Upload file successfully.",
            data:req.files
        })
    })
}