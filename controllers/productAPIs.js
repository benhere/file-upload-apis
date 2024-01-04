const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');

const addProduct = async(req,res) => {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async(req,res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({products, count:products.length})
}

module.exports = {
    addProduct, getAllProducts
}