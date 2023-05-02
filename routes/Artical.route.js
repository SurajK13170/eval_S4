const express = require('express')
const { ArticalModel } = require('../models/Artical.model')
const bcrypt = require('bcrypt')
const { auth } = require('../Middel _Ware/auth')
const jwt = require('jsonwebtoken')

const articalRoute = express.Router()

articalRoute.get('/', auth, async (req, res) => {
    try {
        const artical = await ArticalModel.find({ userID: req.body.userID })
        res.status(200).send(artical)
    } catch (err) {
        res.status(400).json({ 'err': err.message })
    }
})

articalRoute.post('/add', auth, async (req, res) => {
    try {
        const artical = new ArticalModel(req.body)
        await artical.save()
        res.status(200).json({ 'msg': 'Artical Added !' })
    } catch (err) {
        res.status(400).json({ 'err': err.message })
    }
})

articalRoute.patch('/edit/:id', auth, async (req, res) => {
    const { id } = req.params
    const article = await ArticalModel.find({ _id: id })
    try {
        let decoded = jwt.decode(req.headers.authorization.split(' ')[1])
        if (decoded.userID !== article.userID) {
            res.status(400).json({ 'msg': 'Wrong User' })
        } else {
            await ArticalModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).json({ 'msg': 'Article Updated!' })
        }
    } catch (err) {
        res.status(400).json({ 'err': err.message })
    }
})

articalRoute.patch('/edit/:id', auth, async (req, res) => {
    const { id } = req.params
    const article = await ArticalModel.find({ _id: id })
    try {
        let decoded = jwt.decode(req.headers.authorization.split(' ')[1])
        if (decoded.userID !== article.userID) {
            res.status(400).json({ 'msg': 'Wrong User' })
        } else {
            await ArticalModel.findByIdAndDelete({ _id: id })
            res.status(200).json({ 'msg': 'Article Deleted!' })
        }
    } catch (err) {
        res.status(400).json({ 'err': err.message })
    }
})

module.exports = { articalRoute }
