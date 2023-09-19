const Product = require('../models/productModel');
const cloudinary = require('../config/cloudinaryConfig');
const streamifier = require('streamifier');

const addProduct = async (req, res) => {
    try {
        const images = req.files;
        const imageStreams = images.map(image => streamifier.createReadStream(image.buffer));

        const imageUrls = [];

        for (const imageStream of imageStreams) {
            await new Promise((resolve, reject) => {
                const cld_upload_stream = cloudinary.uploader.upload_stream({
                    folder: "beche-din/product-images"
                }, (error, result) => {
                    if (result) {
                        const { secure_url, public_id } = result;
                        imageUrls.push({ public_id, secure_url });
                        resolve();
                    } else {
                        reject(error);
                    }
                });

                imageStream.pipe(cld_upload_stream);
            });
        }

        // console.log({ ...JSON.parse(req.body.payload), seller: req.userId, images: imageUrls})

        const newProduct = new Product({ ...JSON.parse(req.body.payload), seller: req.userId, images: imageUrls })
        await newProduct.save();

        res.json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};





const getAllProducts = async (req, res) => {

    try {

        const { seller, status } = req.body

        // console.log(seller)

        let products = [];
        let filters = {};
        if (seller) {

            filters.seller = seller;

            // products = await Product.find(
            //     filters
            // ).populate("seller").sort({ createdAt: -1 });
            //    console.log(filters)
        }

        if(status)
        {
            filters.status = status;
        }
        // else {
            products = await Product.find(
                filters
            ).populate("seller").sort({ createdAt: -1 });
        // }


        res.json({
            success: true,
            products
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}


const updateProduct = async (req, res) => {
    try {


        const product = await Product.findById(req.params.id);
        const imageUrls = product.images;


        const images = req.files;
        const imageStreams = images.map(image => streamifier.createReadStream(image.buffer));



        for (const imageStream of imageStreams) {
            await new Promise((resolve, reject) => {
                const cld_upload_stream = cloudinary.uploader.upload_stream({
                    folder: "beche-din/product-images"
                }, (error, result) => {
                    if (result) {
                        const { secure_url, public_id } = result;
                        imageUrls.push({ public_id, secure_url });
                        resolve();
                    } else {
                        reject(error);
                    }
                });

                imageStream.pipe(cld_upload_stream);
            });
        }


        await Product.findByIdAndUpdate(req.params.id, { ...JSON.parse(req.body.payload), images: imageUrls, status: "pending" })

        res.json({
            success: true,
            message: "Product updated successfully"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}






const deleteProduct = async (req, res) => {

    try {
        const data = await Product.findByIdAndDelete(req.params.id);

        const deleteImage = (publicId) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (result) {
                    console.log(`Image deleted: ${publicId}`);
                } else {
                    console.error(`Error deleting image ${publicId}:`, error);
                }
            });
        };

        data.images.forEach((e) => {
            deleteImage(e.public_id);
        })


        res.json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}




const deleteSingleImage = async (req, res) => {

    try {

        const { imageId, productId } = req.query;

        const deleteImage = (publicId) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (result) {
                    console.log(`Image deleted: ${publicId}`);
                } else {
                    console.error(`Error deleting image ${publicId}:`, error);
                }
            });
        };

        deleteImage(imageId);


        data = await Product.findById(productId);
        const images = data.images.filter((e) => e.public_id !== imageId)

        await Product.findByIdAndUpdate(productId, { images: images });


        res.json({
            success: true,
            message: "Image deleted successfully"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }


}





const updateProductStatus = async (req,res)=>{

    try {

        const {status} = req.body;
        const {id} = req.params;

        await Product.findByIdAndUpdate(id,{status})

        res.json({
            success: true,
            message: "Product status updated successfully"
        })
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }




}




module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, deleteSingleImage, updateProductStatus };