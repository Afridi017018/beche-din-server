const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, updateProduct} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');


////

const cloudinary = require("../config/cloudinaryConfig");
const upload = require('../config/multerConfig');


////



router.post("/add-product", authMiddleware, upload.array('images'), addProduct);
router.get("/get-all-products", getAllProducts);
router.put("/update-product/:id", authMiddleware, upload.array('images'), updateProduct);
// router.get("/load-images/:id", authMiddleware, loadImages)

///


  


  router.post('/upload', upload.array('images', 5), async (req, res) => {
    try {
        

      res.json(imageUrls);
    } catch (error) {
      res.status(500).json({ message: 'Image upload failed.' });
    }
  });

///


module.exports = router;