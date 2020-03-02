const modelEmployees = require('../models/Employees')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secretKey = "Sinhrofazotron";
const secretKeySignup = "Helicopter";

module.exports = {
    getById: async function(req, res) {
        res.send(await modelEmployees.findById(req.query.id));
    },
    getByFilter: async function(req, res) {
        res.send(await modelEmployees.find({}, {password: 0}));
    },
    add: async function(req, res) {
        const login = req.body.login;
        const password = req.body.password;
        const passwordToSave = bcrypt.hashSync(password, salt)
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const middleName = req.body.middleName;
        const birthday = req.body.birthday;
        const phones = req.body.phones;
        const emails = req.body.emails;
        const position = req.body.position;
        const aministrator = req.body.aministrator;

        if (await modelEmployees.findOne({ login: login })) {
            res.status(500).json({
                message: "Такой логин уже занят",
                data: login
            });
        } else {
            modelEmployees.create(
                {
                    login: login,
                    password: passwordToSave,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    birthday: birthday,
                    phones: phones,
                    emails: emails,
                    position: position,
                    aministrator: aministrator
                },
                function(err) {
                    if (err) {
                        res.status(500).json({ error: err });
                    } else {
                        res.status(200).json({
                            message: "Сотрудник добавлен"
                        });
                    }
                }
            );
        }
    },
    auth: async function(req, res) {
        const login = req.body.login;
        const password = req.body.password;

        modelEmployees.findOne({ login: login }, function(err, infoEmployee) {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                if (infoEmployee != null && bcrypt.compareSync(password, infoEmployee.password)) {
                    const token = jwt.sign({ id: infoEmployee._id }, secretKey, { expiresIn: "1d" });

                    res.status(200).json({
                        message: "Успешная авторизация",
                        data: { token: token }
                    });
                } else {
                    res.status(500).json({
                        status: "error",
                        message: "Неправильный логин/пароль!"
                    });
                }
            }
        });
    },
    verify: async function(req, res) {
        const token = req.body.token;

        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: "Некорректный токен!"
                });
            } else {
                res.status(200).json({
                    message: "Действующий токен",
                    data: { decoded }
                });
            }
        });
    },
    update: async function(req, res) {
        // const id = req.body.id;
        // const name = req.body.name;

        // if (await model.findById(id)) {
        //     model.updateOne(
        //         { _id: id },
        //         { $set: { 
        //             name: name 
        //         } },
        //         function(err,) {
        //             if (err) {
        //                 res.status(500).json({ error: err });
        //                 next(err);
        //             } else {
        //                 res.status(200).json({ 
        //                     message: "Данные обновленны",
        //                     data: { 
        //                         id: id,
        //                         name: name 
        //                     }
        //                 });
        //             }
        //         }
        //     );
        // } else {
        //     res.status(500).json({
        //         message: "Нет сотрудника с таким ID",
        //         data: id
        //     });
        // }
    },
    delete: async function(req, res) {
        const id = req.body.id;

        if (await modelEmployees.findById(id)) {
            modelEmployees.deleteOne(
                { _id: id },
                function(err,) {
                    if (err) {
                        res.status(500).json({ error: err });
                        next(err);
                    } else {
                        res.status(200).json({ 
                            message: "Сотрудник удален"
                        });
                    }
                }
            );
        } else {
            res.status(500).json({
                message: "Нет сотрудника с таким ID",
                data: id
            });
        }
    },
    getLinkSignup: async function(req, res) {
        let linkSignup = "http://localhost:3000/employees/signup?token="
        const token = jwt.sign({ date: new Date() }, secretKeySignup, { expiresIn: "1h" });
        linkSignup += token
        res.send(linkSignup);
    },
    verifySignup: async function(req, res) {
        jwt.verify(req.query.token, secretKeySignup, function(err, decoded) {
            if (err) {
                res.status(500).json({
                    message: "Некорректный токен!"
                });
            } else {
                res.status(200).json({
                    message: "Действующий токен",
                    data: { decoded }
                });
            }
        });
    }
};