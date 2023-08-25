const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');



router.post("/add-product", authMiddleware, addProduct);
router.get("/get-all-products", getAllProducts)


module.exports = router;