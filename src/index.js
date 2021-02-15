const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv/config')

const app = express()

//=SETUP MONGOOSE
mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( ()=> console.log("MongoDB is connection") )
.catch((err)=> console.log("MongoDB fail"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(require('./routes'))

app.listen(8080)