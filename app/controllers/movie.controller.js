/* Modèle utilisé */
const Movie = require('../models').Movie;

/* Constante pour faire des opérations */
const { Op } = require('sequelize');

exports.list_movie = (req, res, next) => {
    // Cherche dans la bdd toutes les entrees du modele Movie / asynchrone
    // SELECT * FROM Movie
    Movie.findAll({})
        .then(monresultat => {
            res.status(200).json(monresultat);
        })
        .catch(err => console.log(err))
}

exports.detail_movie = (req, res, next) => {
    Movie.findByPk(req.params.id)
        .then(data => {
            res.status(200).json({
                message: 'Movie detail',
                data: data
            });
        })
        .catch(err => console.log(err))
}

// exports.search_movie = (req, res, next) => {
//     const search = `%${req.params.search}%`;
//     Movie.findAll({
//         attributes: ['id', 'name', 'price', 'description'],
//         // include: [
//         //     {
//         //         model: Category,
//         //         attributes: ['id', 'name']
//         //     }
//         // ],
//         where: {
//             [Op.or]: [{
//                 name: {
//                     [Op.like]: search
//                 }
//             }, {
//                 price: {
//                     [Op.like]: search,
//                     [Op.lt]: 50
//                 }
//             }]
//         },
//         order: [
//             ['price', 'DESC']
//         ]
//     })
//         .then(data => {
//             res.status(200).json(data);
//         })
//         .catch(err => console.log(err))
// }

exports.add_movie = (req, res, next) => {
    Movie.create(req.body)
        .then(data => {
            res.status(201).json({
                message: 'Movie is created',
                data: data
            })
        })
        .catch(err => console.log(err))
}

exports.delete_movie = (req, res, next) => {
    Movie.destroy({
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

exports.edit_movie = (req, res, next) => {
    Movie.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data == 0) {
                res.status(200).json({
                    mesage: 'Movie edited',
                    data: data
                })
            } else {
                res.status(204).end();
            }
        })
        .catch(err => console.log(err))
}