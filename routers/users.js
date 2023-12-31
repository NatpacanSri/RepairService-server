const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/User')

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/',async (req,res,next)=>{
    try {
        const data = await User.find()
        console.log(data)
        res.json(data)

    } catch (err) {
        next(err)
    }
}) 

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        tel:req.body.tel,
        role:req.body.role
    })

    const result = await user.save()

    const {password, ...data} = await result.toJSON()

    res.send(data)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).send({
            message: 'ไม่พบผู้ใช้งาน'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'รหัสผ่านผิด'
        })
    }

    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    res.send({
        message: 'เข้าสู่ระบบสำเร็จ'
    })
})

router.get('/userExist', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
        // console.log(data)
    } catch (e) {
        // console.error(e)
        
        return res.status(401).send({
            auth: false
        })
    }
})

router.post('/logout', (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message: "Logout success"
    })
})

module.exports = router