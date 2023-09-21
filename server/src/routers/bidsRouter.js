const express = require('express');
const { placeBid, getAllBids } = require('../controllers/bidsController');
const router = express.Router();
// const { testApi } = require('../controllers/testController');

const authMiddleware = require('../middlewares/authMiddleware');



router.post("/place-bid", authMiddleware, placeBid);
router.post("/get-all-bids", authMiddleware, getAllBids);



module.exports = router;