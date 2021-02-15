const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const Post = require('./models/Post')


const { promisify } = require('util')
const fs = require('fs')
const path = require('path')


require('dotenv/config')

//==GET==
routes.get('/posts', async (req, res)=>{
    const post = await Post.find({}).lean()

    res.json(post)
})

//==POST==
routes.post('/post', multer(multerConfig).single('file') , async (req, res) => {
    //const { originalname: name, size, filename: key, destination: url = '' } = req.file //Desistruturação de req.file

    const post = await Post.create({
        name: req.file.originalname, 
        size: req.file.size,
        key: req.file.filename,
        url: `${process.env.APP_URL}/files/${req.file.filename}`  //req.file.destination
    })

    res.json(post)
})

routes.delete('/posts/:id', async (req, res)=>{
    const p = await Post.findOne({_id: req.params.id})
    const img = await p.key;

    promisify(fs.unlink)(path.resolve(__dirname, '..', 'tmp', 'uploads', img))

    const post = await Post.deleteOne({_id: req.params.id})

    res.send()
})

module.exports = routes