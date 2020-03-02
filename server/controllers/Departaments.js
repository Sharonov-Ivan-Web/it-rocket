const modelDepartaments = require('../models/Departaments')

module.exports = {
    getById: async function(req, res) {
        res.send(await modelDepartaments.findById(req.params.id));
    },
    getByFilter: async function(req, res) {
        res.send(await modelDepartaments.find({}, {}));
    },
    add: async function(req, res) {
        const name = req.body.name;
        const employees = req.body.employees;

        if (await modelDepartaments.findOne({ name: name })) {
            res.status(500).json({
                message: "Такой отдел уже есть",
                data: name
            });
        } else {
            modelDepartaments.create(
                {
                    name: name,
                    employees: employees
                },
                function(err) {
                    if (err) {
                        res.status(500).json({ error: err });
                    } else {
                        res.status(200).json({
                            message: "Отдел добавлен"
                        });
                    }
                }
            );
        }
    },
    delete: async function(req, res) {
        const id = req.body.id;

        if (await modelDepartaments.findById(id)) {
            modelDepartaments.deleteOne(
                { _id: id },
                function(err,) {
                    if (err) {
                        res.status(500).json({ error: err });
                        next(err);
                    } else {
                        res.status(200).json({ 
                            message: "Отдел удален"
                        });
                    }
                }
            );
        } else {
            res.status(500).json({
                message: "Нет отдела с таким ID",
                data: id
            });
        }
    }
};