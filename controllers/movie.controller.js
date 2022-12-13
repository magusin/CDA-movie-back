/* Modèle utilisé */
const Actor = require('../models').Actor;
const Movie = require('../models').Movie;

/* Constante pour faire des opérations */
const { Op } = require('sequelize');
const { related } = require('./service-controller');
const { checkIfDataExist } = require('./service-controller');

exports.list_movie = (req, res, next) => {
    // Cherche dans la bdd toutes les entrees du modele Movie / asynchrone
    // SELECT * FROM Movie
    Movie.findAll({})
        .then(monresultat => {
            res.status(200).json({
                message: 'Movie detail',
                data: monresultat
            });
        })
        .catch(err => console.log(err))
}

exports.detail_movie = (req, res, next) => {
    Movie.findByPk(req.params.id, {
        include: related(["Genre", "Director", "Producer", "Pegi", "Actor"]),
    })
        .then(data => {
            res.status(200).json({
                message: 'Movie detail',
                data: data
            });
        })
        .catch(err => console.log(err))
}

exports.add_actor = (req, res, next) => {
    Movie.findByPk(req.body.movie_id)
        .then((movie) => {
            if (!movie) {
                res.status(200).json({ message: 'movie not found!' });
            }
            Actor.findByPk(req.body.actor_id).then((actor) => {
                if (!actor) {
                    res.status(200).json({ message: 'actor not found!' });
                }

                movie.addActor(actor);

                res.status(201).json({
                    message: `>> added actor id=${actor.id} to movie id=${movie.id}`,
                    data: movie
                })
            });
        })
        .catch(err => console.log(err))
};

exports.add_movie = async (req, res, next) => {
    // Check if all value exist
    let dataError = await checkData(req);

    // Display error or create
    if (dataError.error) {
        res.status(200).json({ message: dataError.message });
    } else {
        Movie.create(req.body)
            .then(data => {
                res.status(201).json({
                    message: 'Movie is created',
                    data: data
                })
            })
            .catch(err => console.log(err))
    }
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

exports.edit_movie = async (req, res, next) => {
    // Check if all value exist
    let dataError = checkData(req);

    // Display error or create
    if (dataError.error) {
        res.status(200).json({ message: dataError.message });
    } else {
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
}

async function checkData(req) {
    let dataError = {
        error: false,
        message: ""
    }
    if (req.body.genre_id) {
        const checkData = await checkIfDataExist(req.body.genre_id, "Genre");
        if (checkData.error) {
            dataError = checkData;
        }
    }
    if (req.body.producer_id) {
        const checkData = await checkIfDataExist(req.body.producer_id, "Producer");
        if (checkData.error) {
            dataError = checkData;
        }
    }
    if (req.body.director_id) {
        const checkData = await checkIfDataExist(req.body.director_id, "Director");
        if (checkData.error) {
            dataError = checkData;
        }
    }
    if (req.body.pegi_id) {
        const checkData = await checkIfDataExist(req.body.pegi_id, "Pegi");
        if (checkData.error) {
            dataError = checkData;
        }
    }
    return dataError;
}
