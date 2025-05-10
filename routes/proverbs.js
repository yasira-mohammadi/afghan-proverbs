const express = require('express');
const router = express.Router();
const controller = require('../controllers/proverbsController');

router.get('/', controller.getAll);
router.get('/random', controller.random);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
