const express = require('express');
const router = express.Router();

const producer_controller = require('../controllers/producer.controller');

router.get('/', producer_controller.list_producer);
router.get('/:id', producer_controller.detail_producer);
router.post('/add', producer_controller.add_producer);
router.delete('/:id', producer_controller.delete_producer);
router.put('/:id', producer_controller.edit_producer);

module.exports = router;