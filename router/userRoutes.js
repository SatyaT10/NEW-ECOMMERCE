const router = require('express').Router()

const { userLogin, userSignup, placeOrder, addToCart, getAllProduct } = require('../Controllers/userControllers');
const { signupValidation, loginValidation } = require('../middleware/usersVallidation');
const { verifyToken } = require('../middleware/auth');

router.post('/login', loginValidation, userLogin);

router.post('/signup', signupValidation, userSignup);

router.get('/get-all-product', getAllProduct);

router.post('/add-cart', verifyToken, addToCart),

router.post('/buy-product', verifyToken, placeOrder)

module.exports = router