const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const Post = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

Post.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

module.exports = mongoose.model('Post', Post)