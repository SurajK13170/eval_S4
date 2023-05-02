const express = require('express')
const {connection} = require('./db')
require('dotenv').config()
const app = express()
const {userRoute} = require('./routes/User.route')
const {articalRoute} = require('./routes/Artical.route')
const PORT = process.env.PORT


app.use(express.json())

app.use('/users', userRoute)
app.use('/articles', articalRoute)



app.listen(`${PORT}`, async(req, res)=>{
    try{
        connection
    console.log('connected to Data Base')
    }catch(err){
        console.log('Not Connected')
    }
    console.log(`Server started at ${PORT}`)
})

