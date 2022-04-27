var CenaModel = require('../models/cenaModel.js');

/**
 * cenaController.js
 *
 * @description :: Server-side logic for managing cenas.
 */
module.exports = {

    /**
     * cenaController.list()
     */
    list: function (req, res) {
        CenaModel.find(function (err, cenas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting cena.',
                    error: err
                });
            }

            return res.json(cenas);
        });
    },

    /**
     * cenaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CenaModel.findOne({_id: id}, function (err, cena) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting cena.',
                    error: err
                });
            }

            if (!cena) {
                return res.status(404).json({
                    message: 'No such cena'
                });
            }

            return res.json(cena);
        });
    },

    /**
     * cenaController.create()
     */
    create: function (req, res) {
        var cena = new CenaModel({
			id_izdelka : req.body.id_izdelka,
			Datum_cas : req.body.Datum_cas,
			Cena : req.body.Cena
        });

        cena.save(function (err, cena) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating cena',
                    error: err
                });
            }

            return res.status(201).json(cena);
        });
    },

    /**
     * cenaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CenaModel.findOne({_id: id}, function (err, cena) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting cena',
                    error: err
                });
            }

            if (!cena) {
                return res.status(404).json({
                    message: 'No such cena'
                });
            }

            cena.id_izdelka = req.body.id_izdelka ? req.body.id_izdelka : cena.id_izdelka;
			cena.Datum_cas = req.body.Datum_cas ? req.body.Datum_cas : cena.Datum_cas;
			cena.Cena = req.body.Cena ? req.body.Cena : cena.Cena;
			
            cena.save(function (err, cena) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating cena.',
                        error: err
                    });
                }

                return res.json(cena);
            });
        });
    },

    /**
     * cenaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CenaModel.findByIdAndRemove(id, function (err, cena) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the cena.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
