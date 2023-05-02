const express = require('express')
const {UserModel} = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRoute = express.Router()

userRoute.post('/register', async(req, res)=>{
    const {email, password, name, city, age} = req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=>{
            const user = new UserModel({email, name, age, city, password: hash});
            await user.save();
            res.status(200).json({'msg': 'Register Successfull!'});
        });
    } catch(err){
        res.status(400).json({'err': err.message});
    }
});

userRoute.post('/login', async(req, res)=>{
    const {email, password}= req.body;
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id, user: user.email},'artical');
                    res.status(200).json({'msg':'Login Successfull', 'token':token})
                } else {
                    res.status(400).json('Wrong user Email or Password')
                }
            })
        } else {
            res.send('user not found')
        }
    } catch(err){
        res.status(400).json({'err':err.message})
    }
});

module.exports = {userRoute}