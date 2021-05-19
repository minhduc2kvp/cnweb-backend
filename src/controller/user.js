const statusResponse = require('../common/status')
const User = require('../model/user')
const { uploadImage } = require("../service/upload")

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.json(statusResponse.PARAMS_MISS)

        const userInfo = await User.find({ email: email })
        if (userInfo?.length > 0) return res.json(statusResponse.USER_EXISTED)

        await new User({
            email,
            password
        }).save()
        return res.json(statusResponse.OK)
    } catch (error) {
        res.json(statusResponse.UNKNOWN)
    }
}

const getInfoUser = async (req, res) => {
    const { id } = req.decoded
    try {
        if (!id) return res.json(statusResponse.PARAMS_MISS)
        const userInfo = await User.findById(id).select("username cover_image avatar email birthday friends");
        if (!userInfo) return res.json(statusResponse.NOT_FOUND)
        return res.json({
            ...statusResponse.OK,
            data: userInfo
        })
    } catch (error) {
        res.json(statusResponse.UNKNOWN)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.json(allUsers)
    } catch (error) {
        if (error) {
            res.json('unknown error')
        } else {
            res.json('unknown error')
        }
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.decoded
    try {
        const result = await User.deleteOne({ _id: id });
        res.json(result)
    } catch (error) {
        if (error) {
            res.json('unknown error')
        } else {
            res.json('unknown error')
        }
    }
}

const updateInfoUser = async (req, res) => {
    const { id } = req.decoded
    const { username, phonenumber, email, birthday } = req.body;
    try {
        let userInfo = await User.findById(id)
        if (userInfo) {
            console.log(`req.body`, req.body)
            username && (userInfo.username = username);
            email && (userInfo.email = email);
            phonenumber && (userInfo.phonenumber = phonenumber);
            birthday && (userInfo.birthday = birthday);
            await userInfo.save()
            res.json(userInfo)
        } else {
            throw new Error("user not found")
        }
    } catch (error) {
        if (error.message == "user not found") {
            res.json("user not found")
        } else {
            res.json("unknown error")
        }
    }
}


const uploadAvatar = async (req, res) => {
    const { file } = req
    const { id } = req.decoded
    try {
        var result = await uploadImage(file)
        await User.findByIdAndUpdate(id, {
            $set: {
                avatar: result
            }
        })
        res.json({
            ...statusResponse.OK,
            data: {
                avatar: result
            }
        })
    }
    catch (error) {
        console.log(error)
        res.json(statusResponse.UNKNOWN)
    }
}

const uploadCoverImage = async (req, res) => {
    const { file } = req
    const { id } = req.decoded
    try {
        var result = await uploadImage(file)
        await User.findByIdAndUpdate(id, {
            $set: {
                cover_image: result
            }
        })
        res.json({
            ...statusResponse.OK,
            data: {
                cover_image: result
            }
        })
    }
    catch (error) {
        console.log(error)
        res.json(statusResponse.UNKNOWN)
    }
}

module.exports = {
    signup,
    getInfoUser,
    getAllUsers,
    deleteUser,
    updateInfoUser,
    uploadAvatar,
    uploadCoverImage
}