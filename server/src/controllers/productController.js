const Product = require('../models/productModel')

const addProduct = async (req, res) => {

    try {
        console.log(req.body);
        const newProduct = new Product({ ...req.body, seller: req.userId })
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

}



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


const updateProduct = async (req,res)=>{
    try {
        
        await Product.findByIdAndUpdate(req.params.id, req.body)

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

module.exports = { addProduct, getAllProducts, updateProduct };