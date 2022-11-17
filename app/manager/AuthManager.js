const Validator = require('validator');
const Sequenlize = require('sequelize');
require('dotenv').config();
const Op = require('sequelize').Op;
const auth=require('../config/auth')
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
    signin: (data, callback) => {
        try {

            if (!Pieces.ValidTypeCheck(data.username, 'String')) {
                return callback(1, 'invalid_username', 400, 'the username is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.password, 'String')) {
                return callback(1, 'invalid_password', 400, 'the password is not a string', null);
            }
            let user;
            let where = {}
            where.username = data.username;
            User.findOne({
                where: where,
            }).then(result => {
                user = result;
                if (!user)
                    return callback(null, 'user_not_found', 404, null, null);
                else {
                    const passwordIsValid = bcrypt.compareSync(
                        data.password,
                        user.password
                    );

                    if (!passwordIsValid) {
                        return callback(1, 'Invalid Password!', 401, error, null);
                    }
                    else {
                        return user.getRoles()
                    }
                }
            }).then((listRule) => {
                let authorities = [];
                const token = jwt.sign({ id: user.id }, auth.SECRET, {
                    expiresIn: '30d',
                });

                for (let i = 0; i < listRule.length; i++) {
                    authorities.push("ROLE_" + listRule[i].name.toUpperCase());
                }
                return callback(null, null, 200, null, token);


            })
                .catch(function (error) {
                    return callback(1, 'login_unsuccessful', 403, error, null);
                });

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