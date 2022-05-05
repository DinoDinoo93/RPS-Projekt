var express = require('express');
var router = express.Router();
var izdelekController = require('../controllers/izdelekController.js');
var multer = require('multer');
var upload = multer({dest: 'public/answers/'});
/*
 * GET
 */
router.get('/', izdelekController.list);

/*
 * GET
 */
router.get('/:id', izdelekController.show);

/*
 * POST
 */
router.post('/',izdelekController.create);

/*
 * PUT
 */
router.put('/:id', izdelekController.update);

/*
 * DELETE
 */
router.delete('/:id', izdelekController.remove);

module.exports = router;
