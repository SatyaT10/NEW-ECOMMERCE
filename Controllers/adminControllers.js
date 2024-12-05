const Product = require('../Model/ProductsModal')
const Order = require('../Model/OrdersModal');


const addNewProduct = async (req, res) => {
    try {
        const is_admin = req.user.is_admin

        if (!is_admin) {
            return res.status(401).send({
                message: 'You are not authorized to perform this action.'
            })
        }
        const product = req.body
        await Product.create(product)
        res.status(201).send({ message: 'Product created successfully' })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const is_admin = req.user.is_admin
        if (!is_admin) {
            return res.status(401).send({
                message: 'You are not authorized to perform this action.'
            })
        }
        const product_id = req.body.id
        console.log(product_id);
        const isProduct = await Product.findOne({
            _id: product_id
        })
        res.status(200).json({
            success: true,
            product: isProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const is_admin = req.user.is_admin
        if (!is_admin) {
            return res.status(401).send({
                message: 'You are not authorized to perform this action.'
            })
        }
        const product_id = req.body.id
        console.log(product_id);
        const product = req.body
        const isProduct = await Product.findOne({
            _id: product_id
        })
        if (!isProduct) {
            return res.status(404).send({ message: 'Product not found' })
        }
        await Product.findByIdAndUpdate(product_id, product, { new: true })
        res.status(200).send({ message: 'Product updated successfully' })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const getAllProduct = async (req, res) => {
    try {
        const is_admin = req.user.is_admin
        console.log(is_admin);
        if (!is_admin) {
            return res.status(401).send({
                message: 'You are not authorized to perform this action.'
            })
        }
        const products = await Product.find()
        res.status(200).json({
            success: true,
            products: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const is_admin = req.user.is_admin
        const product_id = req.body.id
        if (!is_admin) {
            return res.status(401).send({
                message: 'You are not authorized to perform this action.'
            })
        }
        const isProduct = await Product.findOne({
            _id: product_id
        })
        if (!isProduct) {
            return res.status(404).send({ message: 'Product not found' })
        }
        await Product.findByIdAndDelete({
            _id: product_id
        })
        res.status(200).send({ message: 'Product deleted successfully' })
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


const getAllOrder = async (req, res) => {
    try {
        const is_admin = req.user.is_admin
        if (!is_admin) {
            return res.status(401).send({
                message: 'You are not authorized to perform this action.'
            })
        }
        const orders = await Order.find()
        console.log(orders);
        res.status(200).json({
            success: true,
            orders: orders
        })

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = {
    addNewProduct,
    updateProduct,
    getAllProduct,
    deleteProduct,
    getAllOrder,
    getProductById
}