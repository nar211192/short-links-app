const { Router } = require('express')
const router = Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


router.post(
    '/register', 
    [
        check('email', 'Sxal email').isEmail(),
        check('password', 'Amenaqich@ 6 simvol').isLength({min: 6}),

    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        console.log('sss', req.body, req.query)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Sxal banera lracrac registraciai vaxat'
            })
        }

        const { email, password } = req.body
        const kandidat =  await User.findOne({ email })

        if (kandidat) {
           return  res.status(400).json({message: "Senc emailov mard arden ka"})
        }
        
        const hashPassword = await bcrypt.hash(password, 12);

        const user = new User({email, password: hashPassword});
        await user.save();

        res.status(201).json({message: 'axoers sax tochni haskaceles u sarqeles'})

    } catch (e) {
        res.status(500).json({message: "Register mi ban en chi mi hat noric stugi"})
    }
})  


// /api/auth/login
router.post(
    '/login',[
        check('email', 'Greq chisht email').normalizeEmail().isEmail(),
        check('password', 'Lracreq passsword@').exists(),

    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Sxal banera lracrac logini vaxat'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({email})
        if (!user) {
            res.status(400).json({message: "Senc mard chka"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({message: "Password@ sxala mi hatel porci"})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: "Login mi ban en chi mi hat noric stugi"})
    }
})  

module.exports = router