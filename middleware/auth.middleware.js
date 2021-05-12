const jwt = require('jsonwebtoken')
const config = require('config') 

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    console.log('1')
    try {   
        console.log('2')
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Is not Login'})
        }
        console.log('3', token)
        const decoded = jwt.verify(token, config.jwtSecret)
        console.log('3', decoded)
        req.user = decoded
        
        console.log('4', req.user)
        next()
    } catch (e) {
        return res.status(401).json({message: 'Is not Login'})
    }
}