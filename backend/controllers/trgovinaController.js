var TrgovinaModel = require('../models/trgovinaModel.js');

/**
 * trgovinaController.js
 *
 * @description :: Server-side logic for managing trgovinas.
 */
module.exports = {

    /**
     * trgovinaController.list()
     */
    list: function (req, res) {
        TrgovinaModel.find(function (err, trgovinas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trgovina.',
                    error: err
                });
            }

            return res.json(trgovinas);
        });
    },

    /**
     * trgovinaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        TrgovinaModel.findOne({_id: id}, function (err, trgovina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trgovina.',
                    error: err
                });
            }

            if (!trgovina) {
                return res.status(404).json({
                    message: 'No such trgovina'
                });
            }

            return res.json(trgovina);
        });
    },
    showIzdelek: function (req, res) {
        var id = req.params.id;
        var idIzdelek = req.params.idIzdelek;
        
        TODO
        /*TrgovinaModel.findOne({_id: id}, function (err, trgovina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trgovina.',
                    error: err
                });
            }

            if (!trgovina) {
                return res.status(404).json({
                    message: 'No such trgovina'
                });
            }

            return res.json(trgovina);
        });*/
    },

    /**
     * trgovinaController.create()
     */
    create: function (req, res) {
        var trgovina = new TrgovinaModel({
			Naziv : req.body.Naziv,
			Celoten_naziv : req.body.Celoten_naziv,
			Naslov : req.body.Naslov,
			Posta : req.body.Posta,
			Kraj : req.body.Kraj,
			Lastnik : req.body.Lastnik,
			Spletna_stran : req.body.Spletna_stran
        });

        trgovina.save(function (err, trgovina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating trgovina',
                    error: err
                });
            }

            return res.status(201).json(trgovina);
        });
    },

    /**
     * trgovinaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        TrgovinaModel.findOne({_id: id}, function (err, trgovina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting trgovina',
                    error: err
                });
            }

            if (!trgovina) {
                return res.status(404).json({
                    message: 'No such trgovina'
                });
            }

            trgovina.Naziv = req.body.Naziv ? req.body.Naziv : trgovina.Naziv;
			trgovina.Celoten_naziv = req.body.Celoten_naziv ? req.body.Celoten_naziv : trgovina.Celoten_naziv;
			trgovina.Naslov = req.body.Naslov ? req.body.Naslov : trgovina.Naslov;
			trgovina.Posta = req.body.Posta ? req.body.Posta : trgovina.Posta;
			trgovina.Kraj = req.body.Kraj ? req.body.Kraj : trgovina.Kraj;
			trgovina.Lastnik = req.body.Lastnik ? req.body.Lastnik : trgovina.Lastnik;
			trgovina.Spletna_stran = req.body.Spletna_stran ? req.body.Spletna_stran : trgovina.Spletna_stran;
			
            trgovina.save(function (err, trgovina) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating trgovina.',
                        error: err
                    });
                }

                return res.json(trgovina);
            });
        });
    },

    /**
     * trgovinaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        TrgovinaModel.findByIdAndRemove(id, function (err, trgovina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the trgovina.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
