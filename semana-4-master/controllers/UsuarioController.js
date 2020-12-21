const {Usuario} = require('../models');
const bcrypt = require('bcryptjs');
const serviciotoken = require('../services/token')



module.exports = {
    
    list : async (req, res, next) => {
        try {
            
            const re = await Usuario.findAll()

            res.status(200).json(re)

        } catch (error) {
            res.status(404).json({'error':'Oops paso algo'})
            next()
        }

    },
    
    register : (req, res, next) => {
        res.status(200).send('Lo haremos en el sprint 3')

    },
    
    login : async (req, res, next) =>{

        try {
             const usuario = await Usuario.findOne( {where: {email: req.body.email} } )
             if (usuario) {
                 //evaluar contraseña
                 const contrasñaValida = bcrypt.compareSync(req.body.password, usuario.password)
                 if (contrasñaValida) {
                     const token =serviciotoken.encode(usuario.id, usuario.rol)

                     res.status(200).send({
                         auth:true,
                         tokenReturn: token,
                         usuario: Usuario,
                     })
                 } else {
                     res.status(401).send({ auth: false, tokenReturn: null, reason:
                        "Invalid Password!" });
                        
                 }
             } else {
                res.status(404).send({'error': 'Usuario no existe'})
             }
        }catch(error){
            res.status(500).json({'error': 'Opps! paso algo'})
            next()
        }

    },

    update: async(req, res, next) =>{

        try {
            //Buscar contrasenia
            const usuario= await Usuario.findOne({ where: {email:req.body.email}})

            //ver si la contraseña es valida
            const validPassword = bcrypt.compareSync(req.body.password, usuario.password)

            // Buscar mi contrasenia
            const newEncriptedPassword = bcrypt.hashSync(req.body.newpassword)

            if (validPassword) {
                const re = await Usuario.update({nombre: req.body.nombre, estado: req.body.estado, password: newEncriptedPassword}, {where: {id:req.body.id}})
                res.status(200).json(re)
            } else {
                res.status(500).json({'error': 'Opps! paso algo'})
            next()
            }



        } catch (error) {
            
        }
    }
}
