const express = require('express');
const router = express.Router();

const genre_controller = require('../controllers/genre.controller');

router.get('/', genre_controller.list_genre);
router.get('/:id', genre_controller.detail_genre);
router.post('/add', genre_controller.add_genre);
router.delete('/:id', genre_controller.delete_genre);
router.put('/:id', genre_controller.edit_genre);

module.exports = router;