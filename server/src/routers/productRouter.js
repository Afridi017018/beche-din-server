const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, updateProduct, deleteProduct, deleteSingleImage, updateProductStatus} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');





router.post("/add-product", authMiddleware, upload.array('images'), addProduct);
router.post("/get-all-products", authMiddleware, getAllProducts);
router.put("/update-product/:id", authMiddleware, upload.array('images'), updateProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);
router.delete("/delete-single-image", authMiddleware, deleteSingleImage);
router.put("/update-product-status/:id", authMiddleware, updateProductStatus)






module.exports = router;