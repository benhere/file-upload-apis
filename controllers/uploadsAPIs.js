const path = require('path')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async(req,res) => {
    // check if file exist
    if(!req.files){
        throw new CustomError.BadRequestError('No File Uploaded');
    }

    let productImage = req.files.image;

    // check file format
    if(!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('please upload an image!!');
    }

    // check image file size
    const maxSize = 1024 * 1024
    if(productImage.size > maxSize){
        throw new CustomError.BadRequestError('please upload image smaller than 1KB');
    }

    const imgPath = path.join(
        __dirname, 
        '../public/uploads/'+`${productImage.name}`
    )
    await productImage.mv(imgPath);
    // console.log(req.files);
    // res.send('product image uploaded successfully!!');
    return res
        .status(StatusCodes.OK)
        .json({image:{src:`/uploads/${productImage.name}`}})
}

const uploadProductImageCloud = async (req,res) => {
    // console.log(req.files.image);
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload',
    })
    // console.log(result);
    
    // delete temp files from temp folder
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({
        image:{
            src:result.secure_url
        }
    })
}

module.exports = {
    uploadProductImageCloud
}