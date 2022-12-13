/* Modèle utilisé */
const Producer = require('../models').Producer;

/* Constante pour faire des opérations */
const { Op } = require('sequelize');
const { related } = require('./service-controller');

exports.list_producer = (req, res, next) => {
    // Cherche dans la bdd toutes les entrees du modele Producer / asynchrone
    // SELECT * FROM Producer
    Producer.findAll({})
        .then(data => {
            res.status(200).json({
                message: 'Producer list',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.detail_producer = (req, res, next) => {
    Producer.findByPk(req.params.id, {
        include: related(["Movie"])
    })
        .then(data => {
            res.status(200).json({
                message: 'Producer detail',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.add_producer = (req, res, next) => {
    Producer.create(req.body)
        .then(data => {
            res.status(201).json({
                message: 'Producer is created',
                data: data
            })
        })
        .catch(err => console.log(err))
}

exports.delete_producer = (req, res, next) => {
    Producer.destroy({
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

exports.edit_producer = (req, res, next) => {
    Producer.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data == 0) {
                res.status(200).json({
                    mesage: 'Producer edited',
                    data: data
                })
            } else {
                res.status(204).end();
            }
        })
        .catch(err => console.log(err))
}