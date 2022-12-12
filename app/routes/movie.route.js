const express = require('express');
const router = express.Router();

const movie_controller = require('../controllers/movie.controller');

router.get('/', movie_controller.list_movie);
router.get('/:id', movie_controller.detail_movie);
// router.get('/search/:search', yule_controller.search_yule);
router.post('/add', movie_controller.add_movie);
router.delete('/:id', movie_controller.delete_movie);
router.put('/:id', movie_controller.edit_movie);

module.exports = router;

/*
CRUD :

GET => RECUPERER
POST => CREER
DELETE => SUPPRIMER
PUT => MODIFIER
F
*/