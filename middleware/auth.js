const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {

    try {
        const token = req.body.token || req.query.token || req.headers['authorization'];
        if (!token) return res.status(400).send({ success: false, msg: "A Token is Requried for Authorization" })
        console.log(token);
        jwt.verify(token, "Satya_Roy", (err, decoded) => {
            if (err) return res.status(400).send({ success: false, msg: "Token is not valid please enter a valid Token" ,err});
            
            req.user = decoded
        })

    } catch (error) {
        return res.status(400).send({ success: false, msg: error.message })
    }
    return next()
}

module.exports = { verifyToken }