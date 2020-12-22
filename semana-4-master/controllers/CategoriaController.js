const {Categoria} = require('../models');



module.exports = {
    list : async (req, res, next) => {
        try {
            const re = await Categoria.findAll()
            res.status(200).json(re)

        } catch (error) {
            res.status(500).json({'error': 'Opps! paso algo'})
            next()
        }

    },
    add : async (req, res, next) => {
        try {
            
            const re = await Categoria.create(req.body)
            res.status(200).json(re)

            
        } catch (error) {
            res.status(500).json({'error': 'Opps! paso algo'})
            next()
        }
    },
    update : async (req, res, next) => {
        try {
            
            const re = await Categoria.update({nombre: req.body.nombre, descripcion: req.body.descripcion},{where: {id: req.body.id}});   
            res.status(200).json(re)

        } catch (error) {
            res.status(500).json({'error': 'Opps! paso algo'})
            next()
        }

    },
    activate : async (req, res, next) => {
        try {

            const re = await Categoria.update({estado: 1},{where: {id: req.body.id}});
            res.status(200).json(re)
            
        } catch (error) {
            res.status(500).json({'error': 'Opps! paso algo'})
            next()
        }
    },
    deactivate : async (req, res, next) => {
        try {

            const re = await Categoria.update({estado: 0},{where: {id: req.body.id}});
            res.status(200).json(re)
            
        } catch (error) {
            res.status(500).json({'error': 'Opps! paso algo'})
            next()
        }
    },
}
