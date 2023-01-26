require("dotenv").config();
const Op = require("sequelize").Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const User = require("../models/User.model");
const Role = require("../models/Role.model");
const { where } = require("sequelize");

module.exports = {
    create: async (data, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(data.username, "String")) {
                return callback(1, "Username is not string.", null, 400);
            }
            if (!Pieces.ValidTypeCheck(data.email, "String")) {
                return callback(1, "Email is incorrect format.", null, 400);
            }
            if (!Pieces.ValidTypeCheck(data.password, "String")) {
                return callback(1, "Password is not string.", null, 400);
            }

            let { username, email, password } = data;
            let userData = { username, email };
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(password, salt);

            let resultUser = await User.create(userData);
            let resultRoles;
            let result;
            userData.id = resultUser.id;
            delete userData.password;
            if (data.roles) {
                resultRoles = await Role.findAll({
                    where: {
                        name: {
                            [Op.or]: data.roles,
                        },
                    },
                });
                result = await resultUser.setRoles(resultRoles);
                userData.roles = data.roles;
                return callback(0, "Create account successful.", userData, 201);
            } else {
                // user has role = 1
                result = await resultUser.setRoles([3]);
                userData.roles = constant.LIST_ROLES[3];

                if (result) {
                    return callback(
                        0,
                        "Create account successful.",
                        userData,
                        201
                    );
                }
            }
        } catch (error) {
            return callback(1, "Create account unsuccessful", 400, error, null);
        }
    },
    signin: async (data, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(data.username, "String")) {
                return callback(1, "Username is not string.", null, 400);
            }
            if (!Pieces.ValidTypeCheck(data.password, "String")) {
                return callback(1, "Password is not string.", null, 400);
            }
            let where = {};
            where.username = data.username;
            let userInfo = await User.findOne({
                where: where,
            });
            if (!userInfo) {
                return callback(
                    1,
                    "Username or password is incorrect.",
                    null,
                    401
                );
            } else {
                const passwordIsValid = bcrypt.compare(
                    data.password,
                    userInfo.password
                );

                if (!passwordIsValid) {
                    return callback(
                        1,
                        "Username or password is incorrect.",
                        null,
                        401
                    );
                } else {
                    try {
                        let listRules = await userInfo.getRoles();
                        const accessToken = jwt.sign(
                            { email: userInfo.email },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: process.env.EXPIRES_IN,
                            }
                        );
                        const refreshToken = jwt.sign(
                            { email: userInfo.email },
                            process.env.REFRESH_TOKEN_SECRET,
                            {
                                expiresIn: process.env.EXPIRES_IN,
                            }
                        );
                        await User.update(
                            { refresh_token: refreshToken },
                            {
                                where: where,
                            }
                        );
                        let { id, username, email } = userInfo;
                        let user = {
                            id,
                            username,
                            email,
                            accessToken,
                            refreshToken,
                        };
                        user.listRules = [];
                        for (let i = 0; i < listRules.length; i++) {
                            user.listRules.push(
                                "ROLE_" + listRules[i].name.toUpperCase()
                            );
                        }

                        return callback(0, "Login is successful.", user, 401);
                    } catch (error) {
                        return callback(1, "Login is unsuccessful.", null, 403);
                    }
                }
            }
        } catch (error) {
            return callback(0, "Login is unsuccessful.", null, 400);
        }
    },
    token: async (data, callback) => {
        if (!Pieces.ValidTypeCheck(data.email, "String")) {
            return callback(1, "email is not string.", null, 400);
        }
        if (!Pieces.ValidTypeCheck(data.refreshToken, "String")) {
            return callback(1, "Refresh Token is not string.", null, 400);
        }
        let { email, refreshToken } = data;
        let where = { email, refresh_token: refreshToken };
        let dataUser = await User.findOne({
            where,
        });
        if (!dataUser) {
            try {
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) {
                            // console.log(err);
                            return callback(1, "Unauthorized.", null, 401);
                        }

                        const accessToken = jwt.sign(
                            { email: decoded.email },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: process.env.EXPIRES_IN,
                            }
                        );
                        return callback(
                            0,
                            "Refresh token is successful.",
                            { accessToken },
                            200
                        );
                    }
                );
            } catch (error) {
                return callback(1, "Invalid token.", null, 403);
            }
        } else {
            if (err) {
                // console.log(err);
                return callback(1, "Unauthorized.", null, 401);
            }
        }
    },
    signout: async (data, callback) => {
        try {
            let { email, refreshToken } = data;
            let where = { email, refresh_token: refreshToken };
            let ClearRefreshToken = await User.update(
                { refresh_token: null },
                {
                    where: where,
                }
            );
            if (ClearRefreshToken[0] === 0) {
                return callback(0, "Logout is unsuccessful", null, 400);
            }
            return callback(0, "You've been signed out!", null, 200);
        } catch (error) {
            return callback(0, "Logout is unsuccessful", null, 400);
        }
    },
};
