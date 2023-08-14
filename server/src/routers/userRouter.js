const express = require('express');
const { testApi } = require('../controllers/testController');
const { userRegister, userLogin } = require('../controllers/userControllers');
const router = express.Router();


router.get('/test', testApi);
router.post('/register', userRegister);
router.post('/login', userLogin);



module.exports = router;