const jwt = require("jsonwebtoken");
const db = require("../models");
const User = require("../models/User.model");
const Restware = require("../utils/Restware");

verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token") || "";
    // If token not found, send error message
    if (!token) {
        return Restware.sendData(res, 1, "Token not found.", null, 401);
    }

    // Authenticate token
    try {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    // console.log(err);
                    return Restware.sendData(
                        res,
                        1,
                        "Unauthorized.",
                        null,
                        401
                    );
                }
                req.email = decoded.email;
                const user = await User.findOne({
                    where: { email: req.email },
                });
                req.userId = user.id;
                return next();
            }
        );
    } catch (error) {
        return Restware.sendData(res, 1, "Invalid token.", null, 403);
    }
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                return next();
            }
        }

        return Restware.sendData(res, 1, "Require Admin Role!", null, 403);
    } catch (error) {
        return Restware.sendData(
            res,
            1,
            "Unable to validate User role!.",
            null,
            500
        );
    }
};

isModerator = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                return next();
            }
        }

        return Restware.sendData(res, 1, "Require Moderator Role!", null, 403);
    } catch (error) {
        return Restware.sendData(
            res,
            1,
            "Unable to validate Moderator role!",
            null,
            500
        );
    }
};

isModeratorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                return next();
            }

            if (roles[i].name === "admin") {
                return next();
            }
        }

        return Restware.sendData(
            res,
            1,
            "Require Moderator or Admin Role!",
            null,
            403
        );
    } catch (error) {
        return Restware.sendData(
            res,
            1,
            "Unable to validate Moderator or Admin role!",
            null,
            500
        );
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin,
};
module.exports = authJwt;
