const express = require('express');
const router = express.Router();
const { testApi } = require('../controllers/testController');
const { userRegister, userLogin, getCurrentUser, getAllUsers, updateUserStatus } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/test', authMiddleware, testApi);
router.post('/register', userRegister);
router.post('/login', userLogin);

router.get("/get-current-user", authMiddleware, getCurrentUser);
router.get("/get-all-users", authMiddleware, getAllUsers);
router.put("/update-user-status/:id", authMiddleware, updateUserStatus)



module.exports = router;