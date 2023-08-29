const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, updateProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');


////
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2

const {cloudName, apiKey, apiSecret} = require("../secret.js")

////



router.post("/add-product", authMiddleware, addProduct);
router.get("/get-all-products", getAllProducts)
router.put("/update-product/:id", authMiddleware, updateProduct)

///

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
  
  // Configure Multer for image upload with disk storage
  const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });

  router.post('/upload', upload.array('images', 5), async (req, res) => {
    try {
      const imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path,{tags: ['beche_din']});
        imageUrls.push({image_id: result.public_id , image: result.secure_url});
      }
      res.json(imageUrls);
    } catch (error) {
      res.status(500).json({ message: 'Image upload failed.' });
    }
  });

///


module.exports = router;