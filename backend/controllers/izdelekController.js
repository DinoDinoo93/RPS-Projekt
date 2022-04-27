var IzdelekModel = require('../models/izdelekModel.js');

/**
 * izdelekController.js
 *
 * @description :: Server-side logic for managing izdeleks.
 */
module.exports = {

    /**
     * izdelekController.list()
     */
    list: function (req, res) {
        IzdelekModel.find(function (err, izdeleks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting izdelek.',
                    error: err
                });
            }

            return res.json(izdeleks);
        });
    },

    /**
     * izdelekController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        IzdelekModel.findOne({_id: id}, function (err, izdelek) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting izdelek.',
                    error: err
                });
            }

            if (!izdelek) {
                return res.status(404).json({
                    message: 'No such izdelek'
                });
            }

            return res.json(izdelek);
        });
    },

    /**
     * izdelekController.create()
     */
    create: function (req, res) {
        var izdelek = new IzdelekModel({
			id_trgovine : req.body.id_trgovine,
			Naziv : req.body.Naziv,
			Vrsta : req.body.Vrsta,
			Opis : req.body.Opis,
			Slika : req.body.Slika
        });

        izdelek.save(function (err, izdelek) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating izdelek',
                    error: err
                });
            }

            return res.status(201).json(izdelek);
        });
    },

    /**
     * izdelekController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        IzdelekModel.findOne({_id: id}, function (err, izdelek) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting izdelek',
                    error: err
                });
            }

            if (!izdelek) {
                return res.status(404).json({
                    message: 'No such izdelek'
                });
            }

            izdelek.id_trgovine = req.body.id_trgovine ? req.body.id_trgovine : izdelek.id_trgovine;
			izdelek.Naziv = req.body.Naziv ? req.body.Naziv : izdelek.Naziv;
			izdelek.Vrsta = req.body.Vrsta ? req.body.Vrsta : izdelek.Vrsta;
			izdelek.Opis = req.body.Opis ? req.body.Opis : izdelek.Opis;
			izdelek.Slika = req.body.Slika ? req.body.Slika : izdelek.Slika;
			
            izdelek.save(function (err, izdelek) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating izdelek.',
                        error: err
                    });
                }

                return res.json(izdelek);
            });
        });
    },

    /**
     * izdelekController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        IzdelekModel.findByIdAndRemove(id, function (err, izdelek) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the izdelek.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
