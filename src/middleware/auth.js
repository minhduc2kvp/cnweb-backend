const User = require("../model/user");
const jwt = require("jsonwebtoken")
const accessTokenSecret = process.env.SECRET_STRING;

let isAuth = async (req, res, next) => {
    const tokenFromClient =
        req.body?.token || req.query?.token || req.headers["x-access-token"]
    try {
        if (!tokenFromClient) throw new Error("Token Null!!!")
        const decoded = await jwt.verify(
            tokenFromClient,
            accessTokenSecret
        );
        req.decoded = decoded;
        next();
    } catch (error) {
        res.json(error?.message)
    }
};

module.exports = {
    isAuth
};