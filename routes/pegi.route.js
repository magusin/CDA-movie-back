const express = require('express');
const router = express.Router();

const pegi_controller = require('../controllers/pegi.controller');

router.get('/', pegi_controller.list_pegi);
router.get('/:id', pegi_controller.detail_pegi);
router.post('/add', pegi_controller.add_pegi);
router.delete('/:id', pegi_controller.delete_pegi);
router.put('/:id', pegi_controller.edit_pegi);

module.exports = router;