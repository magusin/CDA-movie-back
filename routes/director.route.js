const express = require('express');
const router = express.Router();

const director_controller = require('../controllers/director.controller');

router.get('/', director_controller.list_director);
router.get('/:id', director_controller.detail_director);
router.post('/add', director_controller.add_director);
router.delete('/:id', director_controller.delete_director);
router.put('/:id', director_controller.edit_director);

module.exports = router;