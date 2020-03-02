const modelSettings = require('../models/Settings')
const modelDepartaments = require('../models/Departaments')
const modelEmployees = require('../models/Employees')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    get: async function(req, res) {
        res.send(await modelSettings.find({}));
    },
    add: async function(req, res) {
        modelEmployees.create(
            {
                login: req.body.phone,
                password: bcrypt.hashSync(req.body.password, salt),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phones: [req.body.phone],
                aministrator: true
            },
            function(err, doc) {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    const idAdmin = doc._id

                    modelDepartaments.create(
                        {
                            name: req.body.nameCompany,
                            head: idAdmin
                        },
                        function(err) {
                            if (err) {
                                res.status(500).json({ error: err });
                            } else {
                                modelSettings.create(
                                    {
                                        nameCompany: req.body.nameCompany
                                    },
                                    function(err) {
                                        if (err) {
                                            res.status(500).json({ error: err });
                                        } else {
                                            res.status(200).json({
                                                message: "Успешное создание компании"
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    },
    update: async function(req, res) {
        const id = req.body.id;
        const nameCompany = req.body.nameCompany;
        if (await modelSettings.findById(id)) {
            modelSettings.updateOne(
                { _id: id },
                { $set: { 
                    nameCompany: nameCompany
                } },
                function(err, doc) {
                    if (err) {
                        res.status(500).json({ error: err });
                        next(err);
                    } else {
                        res.status(200).json({ 
                            message: "Данные обновленны",
                            data: doc
                        });
                    }
                }
            );
        } else {
            res.status(500).json({
                message: "Ошибка обновления настроек",
                data: id
            });
        }
    }
};