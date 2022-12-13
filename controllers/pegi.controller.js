/* Modèle utilisé */
const Pegi = require('../models').Pegi;

/* Constante pour faire des opérations */
const { Op } = require('sequelize');
const { related } = require('./service-controller');

exports.list_pegi = (req, res, next) => {
    // Cherche dans la bdd toutes les entrees du modele Pegi / asynchrone
    // SELECT * FROM Pegi
    Pegi.findAll({})
        .then(data => {
            res.status(200).json({
                message: 'Pegi list',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.detail_pegi = (req, res, next) => {
    Pegi.findByPk(req.params.id, {
        include: related(["Movie"])
    })
        .then(data => {
            res.status(200).json({
                message: 'Pegi detail',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.add_pegi = (req, res, next) => {
    Pegi.create(req.body)
        .then(data => {
            res.status(201).json({
                message: 'Pegi is created',
                data: data
            })
        })
        .catch(err => console.log(err))
}

exports.delete_pegi = (req, res, next) => {
    Pegi.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data == 0) {
                res.status(200).json({ message: 'no Data to delete' });
            } else {
                res.status(204).end();
            }
        })
        .catch(err => console.log(err))
}

exports.edit_pegi = (req, res, next) => {
    Pegi.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data == 0) {
                res.status(200).json({
                    mesage: 'Pegi edited',
                    data: data
                })
            } else {
                res.status(204).end();
            }
        })
        .catch(err => console.log(err))
}