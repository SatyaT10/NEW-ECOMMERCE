const model = require('../Model/userModel');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const Order = require('../Model/OrdersModal');
const Product = require('../Model/ProductsModal')
const Cart = require('../Model/CardModal');

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await model.findOne({ email: email });
        const errorMsg = "Login failed email or password is wrong !"
        if (userData) {
            const isValidPassword = await bcrypt.compare(password, userData.password);
            if (isValidPassword) {
                const jwtToken = Jwt.sign(
                    { email: userData.email, id: userData._id, is_admin: userData.is_admin },
                    process.env.JWT_SECEART,
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    email,
                    name: userData.name,
                    token: jwtToken
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: errorMsg
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: errorMsg
            });
        }
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await model.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exist" })
        }
        const user = new model({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })
        await user.save();
        res.status(200).json({ success: true, message: "User created successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error", error })
    }
}

const placeOrder = async (req, res) => {
    try {
        const userId = req.user;

        const { products } = req.body;

        let totalAmount = 0;

        for (const item of products) {
            const product = await Product.findById(item.product);
            // if (!product || product.sizes.get(item.size) < item.quantity) {
            //     return res.status(400).json({ message: 'Invalid order' });
            // }
            // product.sizes.set(item.size, product.sizes.get(item.size) - item.quantity);
            // await product.save();
            totalAmount += product.price * item.quantity;
        }
        const order = new Order({ userId, products, totalAmount });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error })
    }
}


const addToCart = async (req, res) => {
    const userId = req.user
    const { productId, size, quantity } = req.body;

    if (!userId || !productId || !size || !quantity) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found!' });
        }

        const price = product.price;
        const itemTotal = price * quantity;

        let cart = await Cart.findOne({ userId });

        if (!cart) {

            cart = new Cart({
                userId,
                items: [{ productId, size, quantity, price }],
                totalPrice: itemTotal
            });
        } else {

            const existingItemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId && item.size === size
            );

            if (existingItemIndex > -1) {

                cart.items[existingItemIndex].quantity += quantity;
                cart.items[existingItemIndex].price = price;
            } else {

                cart.items.push({ productId, size, quantity, price });
            }
            cart.totalPrice += itemTotal;
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = {
    userLogin,
    userSignup,
    placeOrder,
    addToCart,
    getAllProduct
}