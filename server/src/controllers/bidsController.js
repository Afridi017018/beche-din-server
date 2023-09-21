const Bids = require('../models/bidModel');

const placeBid = async (req, res) => {

    try {

        const newBid = new Bids({ ...req.body, buyer: req.userId });
        await newBid.save();
        res.json({
            success: true,
            message: "Bid placed successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}


const getAllBids = async (req, res) => {

    try {
    const { product, seller } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }

    const bids = await Bids.find(filters)
      .populate("product")
      .populate({
        path: "buyer",
        select: "name email"
    })
      .populate({
        path: "seller",
        select: "name email"
    }).sort({ bidAmount: -1 });

      res.json({
        success: true,
        data: bids,
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}


module.exports = { placeBid, getAllBids };