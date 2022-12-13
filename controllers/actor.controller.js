/* Modèle utilisé */
const Actor = require('../models').Actor;
const Movie = require('../models').Movie;

/* Constante pour faire des opérations */
const { Op } = require('sequelize');
const { related } = require('./service-controller');

exports.list_actor = (req, res, next) => {
    Actor.findAll({})
        .then(monresultat => {
            res.status(200).json(monresultat);
        })
        .catch(err => console.log(err))
}

exports.detail_actor = (req, res, next) => {
    Actor.findByPk(req.params.id, {
        include: related("Movie"),
    })
        .then(data => {
            res.status(200).json({
                message: 'Actor detail',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.add_actor = (req, res, next) => {
    Actor.create(req.body)
        .then(data => {
            res.status(201).json({
                message: 'Actor is created',
                data: data
            })
        })
        .catch(err => console.log(err))
}

exports.delete_actor = (req, res, next) => {
    Actor.destroy({
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

exports.edit_actor = (req, res, next) => {
    Actor.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data == 0) {
                res.status(200).json({
                    mesage: 'Actor edited',
                    data: data
                })
            } else {
                res.status(204).end();
            }
        })
        .catch(err => console.log(err))
}