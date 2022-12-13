/* Modèle utilisé */
const Director = require('../models').Director;

/* Constante pour faire des opérations */
const { Op } = require('sequelize');
const { related } = require('./service-controller');

exports.list_director = (req, res, next) => {
    // Cherche dans la bdd toutes les entrees du modele Director / asynchrone
    // SELECT * FROM Director
    Director.findAll({})
        .then(data => {
            res.status(200).json({
                message: 'Director list',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.detail_director = (req, res, next) => {
    Director.findByPk(req.params.id, {
        include: related(["Movie"])
    })
        .then(data => {
            res.status(200).json({
                message: 'Director detail',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.add_director = (req, res, next) => {
    Director.create(req.body)
        .then(data => {
            res.status(201).json({
                message: 'Director is created',
                data: data
            })
        })
        .catch(err => console.log(err))
}

exports.delete_director = (req, res, next) => {
    Director.destroy({
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

exports.edit_director = (req, res, next) => {
    Director.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data == 0) {
                res.status(200).json({
                    mesage: 'Director edited',
                    data: data
                })
            } else {
                res.status(204).end();
            }
        })
        .catch(err => console.log(err))
}