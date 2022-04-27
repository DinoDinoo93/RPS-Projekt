var express = require('express');
var router = express.Router();
var trgovinaController = require('../controllers/trgovinaController.js');

/*
 * GET
 */
router.get('/', trgovinaController.list);

/*
 * GET
 */
router.get('/:id', trgovinaController.show);

router.get('/:id/:idIzdelek', trgovinaController.showIzdelek);


/*
 * POST
 */
router.post('/', trgovinaController.create);

/*
 * PUT
 */
router.put('/:id', trgovinaController.update);

/*
 * DELETE
 */
router.delete('/:id', trgovinaController.remove);

module.exports = router;
