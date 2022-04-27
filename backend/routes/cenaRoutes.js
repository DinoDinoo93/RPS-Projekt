var express = require('express');
var router = express.Router();
var cenaController = require('../controllers/cenaController.js');

/*
 * GET
 */
router.get('/', cenaController.list);

/*
 * GET
 */
router.get('/:id', cenaController.show);

/*
 * POST
 */
router.post('/', cenaController.create);

/*
 * PUT
 */
router.put('/:id', cenaController.update);

/*
 * DELETE
 */
router.delete('/:id', cenaController.remove);

module.exports = router;
