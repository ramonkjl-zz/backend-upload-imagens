const multer = require('multer')
const path = require('path')
const crypto = require('crypto')


module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    //Se a foto não for do tipo jpeg/jpg e png, não conclui o upload e volta um erro / new Error
    fileFilter: function (req, file, cb) {
        if ((file.mimetype !== 'image/jpeg') && (file.mimetype !== 'image/png') ) {
            cb(new Error("Invalid file type."))
        }else{
            cb(null, true);
        }   
    }
    // fileFilter: (req, file, cb)=>{
    //     const allowedMimes = [
    //         "image/jpeg",
    //         "image/pjpeg",
    //         "image/png",
    //         "image/gif"
    //     ];

    //     if(allowedMimes.includes(file.mimetypes)){
    //         cb(null, true)
    //     }else{
    //         cb(new Error("Invalid file type."))
    //     }
    // }

}