
const express = require("express");
const router = express.Router();

const { addProduct, getAllProducts } = require("../controllers/productAPIs");
const { uploadProductImageCloud } = require("../controllers/uploadsAPIs");

router.route('/').post(addProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImageCloud);

module.exports = router;