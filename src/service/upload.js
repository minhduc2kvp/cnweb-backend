const Image = require('../model/image')
const fs = require('fs')

const URL_IMAGE_API = process.env.URL_IMAGE_API

const uploadImage = async (file) => {
    let img = fs.readFileSync(file.path)
    let encodeImage = img.toString('base64')

    let image = new Image({
        content: encodeImage
    })
    
    return new Promise(resolve => {
        image.save()
            .then(result => {
                resolve(`${URL_IMAGE_API}/${result._id}`) // resolve url of image
            })
            .catch(err => {
                console.log(err)
                resolve("Upload file fail!!!")
            })
    })
}

module.exports = {
    uploadImage
}
