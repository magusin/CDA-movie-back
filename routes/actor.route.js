const express = require('express');
const router = express.Router();

const actor_controller = require('../controllers/actor.controller');

router.get('/', actor_controller.list_actor);
router.get('/:id', actor_controller.detail_actor);
router.post('/add', actor_controller.add_actor);
router.delete('/:id', actor_controller.delete_actor);
router.put('/:id', actor_controller.edit_actor);

module.exports = router;