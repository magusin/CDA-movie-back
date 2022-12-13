/* Modèle utilisé */
const Genre = require('../models').Genre;

/* Constante pour faire des opérations */
const { Op } = require('sequelize');
const { related } = require('./service-controller');

exports.list_genre = (req, res, next) => {
    // Cherche dans la bdd toutes les entrees du modele Genre / asynchrone
    // SELECT * FROM Genre
    Genre.findAll({})
        .then(data => {
            res.status(200).json({
                message: 'Genre list',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.detail_genre = (req, res, next) => {
    Genre.findByPk(req.params.id, {
        include: related(["Movie"])
    })
        .then(data => {
            res.status(200).json({
                message: 'Genre detail',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.add_genre = (req, res, next) => {
    Genre.create(req.body)
        .then(data => {
            res.status(201).json({
                message: 'Genre is created',
                data: data
            })
        })
        .catch(err => console.log(err))
}

exports.delete_genre = (req, res, next) => {
    Genre.destroy({
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

exports.edit_genre = (req, res, next) => {
    Genre.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data == 0) {
                res.status(200).json({
                    mesage: 'Genre edited',
                    data: data
                })
            } else {
                res.status(204).end();
            }
        })
        .catch(err => console.log(err))
}