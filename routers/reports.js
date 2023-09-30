const express = require('express')
const router = express.Router()
const Report = require('../models/Report')

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await Report.find()
            .populate('user')
            .populate('item');
        console.log(data)
        res.json(data)

    } catch (err) {
        next(err)
    }
})

router.get('/oneReport/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Report.findById(id)
            .populate('user')
            .populate('item');
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const data = await Report.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { itemID, detail, room, status } = req.body
        const data = await Report.findById(id).updateOne({
            $set: {
                itemID: itemID,
                detail: detail,
                room: room,
                status: status,
            }
        })

        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Report.findById(id).deleteOne()
        res.json(data)
    } catch (err) {
        next(err)
    }
})


module.exports = router