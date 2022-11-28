const Validator = require('validator');
const Sequenlize = require('sequelize');
require('dotenv').config();
const Op = require('sequelize').Op;
const auth = require('../config/auth')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const User = require('../models/User.model');
const Role = require('../models/Role.model');

module.exports = {
    create: async (data, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(data.username, 'String')) {
                return callback(1, 'invalid_username', 400, 'the username is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.email, 'String')) {
                return callback(1, 'invalid_email', 400, 'the email is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.password, 'String')) {
                return callback(1, 'invalid_password', 400, 'the password is not a string', null);
            }
            let userData = {};
            userData.username = data.username;
            userData.email = data.email;
            userData.password = bcrypt.hashSync(data.password, 8);
            let user;
            let resultUser = await User.create(userData);
            let resultRoles
            let result

            if (data.roles) {
                resultRoles = await Role.findAll({
                    where: {
                        name: {
                            [Op.or]: data.roles,
                        },
                    },
                })

                result = await resultUser.setRoles(resultRoles);
                return callback(null, null, 200, null, resultUser);
            } else {
                // user has role = 1
                result = await resultUser.setRoles([1])
                if (result) {
                    return callback(null, null, 200, null, resultUser);
                }
            }

        } catch (error) {
            return callback(1, 'create_account_fail', 400, error, null);
        }
    },
    signin: async (data, callback) => {
        try {

            if (!Pieces.ValidTypeCheck(data.username, 'String')) {
                return callback(1, 'invalid_username', 400, 'the username is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.password, 'String')) {
                return callback(1, 'invalid_password', 400, 'the password is not a string', null);
            }
            let user = {};
            user.listRules = [];
            let where = {}
            where.username = data.username;
            let userInfo = await User.findOne({
                where: where,
            })
            if (!userInfo) {
                return callback(1, 'user_not_found', 404, null, null);
            }
            else {
                user.id = userInfo.id;
                user.username = userInfo.username;
                user.email = userInfo.email;
                const passwordIsValid = bcrypt.compareSync(
                    data.password,
                    userInfo.password
                );

                if (!passwordIsValid) {
                    return callback(1, 'Invalid Password!', 401, null, null);
                }
                else {
                    try {
                        let listRules = await userInfo.getRoles()
                        let authorities = [];
                        const token = jwt.sign({ id: user.id }, auth.SECRET, {
                            expiresIn: '30d',
                        });

                        for (let i = 0; i < listRules.length; i++) {
                            authorities.push("ROLE_" + listRules[i].name.toUpperCase());
                            user.listRules.push("ROLE_" + listRules[i].name.toUpperCase());

                        }
                        user.token=token;
                        return callback(null, null, 200, null, user);
                    } catch (error) {
                        return callback(1, 'login_unsuccessful', 403, error, null);
                    }
                }
            }


        } catch (error) {
            return callback(1, 'login_unsuccessful', 400, error, null);
        }
    },
    // signout: (req, callback) => {
    //     try {
    //         req.session = null;
    //         return callback(1, 'You\'ve been signed out!', 403, error, null);

    //     } catch (error) {
    //         return callback(1, 'logout_unsuccessful', 400, error, null);
    //     }
    // }
}