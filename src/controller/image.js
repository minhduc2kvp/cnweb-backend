const Image = require('../model/image')

const getImageById = async (req, res) => {
    const { id } = req.params
    const image = await Image.findById(id)
    const content = Buffer.from(image.content, 'base64')

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': content.length
    });
    
    res.end(content)
}

module.exports = {
    getImageById
}