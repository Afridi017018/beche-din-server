const Product = require('../models/productModel');

const fs = require('fs').promises;
const os = require('os');
const path = require('path');
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
                    folder: "foo"
                }, (error, result) => {
                    if (result) {
                        const { secure_url, public_id } = result;
                        imageUrls.push({public_id, secure_url} );
                        resolve(); 
                    } else {
                        reject(error);
                    }
                });

                imageStream.pipe(cld_upload_stream);
            });
        }

        // console.log({ ...JSON.parse(req.body.payload), seller: req.userId, images: imageUrls})
  
        const newProduct = new Product({ ...JSON.parse(req.body.payload), seller: req.userId, images: imageUrls})
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
        const products = await Product.find();

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
                    folder: "foo"
                }, (error, result) => {
                    if (result) {
                        const { secure_url, public_id } = result;
                        imageUrls.push({public_id, secure_url} );
                        resolve(); 
                    } else {
                        reject(error);
                    }
                });

                imageStream.pipe(cld_upload_stream);
            });
        }


        await Product.findByIdAndUpdate(req.params.id, {...JSON.parse(req.body.payload), images: imageUrls})

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



// const loadImages = async (req, res) => {
//     try {

//         const { id } = req.params;

//         const imageData = await Product.findById(id);

//         // console.log(imageData);
//         //  imageData.images.push(
//         //     {
//         //         "image_id": "yjkvraxe10lp4clly1a9",
//         //         "image": "https://res.cloudinary.com/dmmdqic2v/image/upload/v1693467175/yjkvraxe10lp4clly1a9.png"
//         //     },
//         //     {
//         //         "image_id": "l5cpz1kxaigqiupmdg9a",
//         //         "image": "https://res.cloudinary.com/dmmdqic2v/image/upload/v1693467177/l5cpz1kxaigqiupmdg9a.png"
//         //     },
//         //     {
//         //         "image_id": "rtb4nc2eojet78twc9rs",
//         //         "image": "https://res.cloudinary.com/dmmdqic2v/image/upload/v1693467179/rtb4nc2eojet78twc9rs.png"
//         //     }
//         // )

//         // await Product.findByIdAndUpdate(id,{images: imageData.images})
 
//         res.send(imageData.images)


//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }



module.exports = { addProduct, getAllProducts, updateProduct};