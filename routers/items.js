const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Item = require('../models/Item')

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/', async (req, res, next) => {
    try {
        const data = await Item.find()
        console.log(data)
        res.json(data)

    } catch (err) {
        next(err)
    }
})

router.get('/oneItem/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Item.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const data = await Item.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { itemID, itemName, status } = req.body
        const data = await Item.findById(id).updateOne({
            $set: {
                itemID: itemID,
                itemName: itemName,
                status: status,
            }
        })

        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/edit_/', async (req, res, next) => {
    try {
        const { itemID } = req.query;
        const { status } = req.body
        const data = await Item.findOne({itemID}).updateOne({
            $set: {
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
        const data = await Item.findById(id).deleteOne()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/search', async (req, res) => {
    try {
        const { itemID } = req.query;
        const item = await Item.findOne({ itemID });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ _id:item._id,itemName: item.itemName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router