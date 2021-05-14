const statusResponse = require('../common/status')
const { uploadImage } = require('../service/upload')

const uploadImages = async (req, res) => {
    const { files } = req
    try {
        var result = await Promise.all(files.map(file => uploadImage(file)))
        res.json({
            ...statusResponse.OK,
            data: result
        })
    }
    catch (error) {
        res.json(error)
    }
}
module.exports = {
    uploadImages
}