const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

router.get('/', trainingController.training_list);
router.get('/new', trainingController.training_create_get);
router.post('/', trainingController.training_create_post);
router.get('/:id/edit', trainingController.training_update_get);
router.put('/:id', trainingController.training_update_put);
router.delete('/:id', trainingController.training_delete);

module.exports = router;
