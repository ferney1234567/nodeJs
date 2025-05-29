const db = require('../models');
const {Router} = require('express');
//Creamos el router para  poder usar los verbos HTTP
const router = Router();

router.get("/", (req,res)=>{
    res.send({Title: 'Hello ADSO!'});
});

module.exports = router;

router.post('/new', async(req,res)=>{
    let {name, email, password} = req.body;
    try {
        await db.User.create({
            name,
            email,
            password
        });
        res.status(200).send('Usuario creado exitosamente');
    } catch (error) {
        res.status(400).send('El usuari9o no pudo ser creado');
    }
})

router.get('all',async(req,res)=>{
    try {
        let users = await db.User.findAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('No se encontraron usuarios');
    }
})

router.get('/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        let users = await db.User.findByPk(id);
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('No se pudo obtener el usuario');
    }
})

router.put('/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        let {name, email, password} = req.body;
        await db.User.update(
            {
                name,
                email,
                password
            },
            {
                where: {id}
            }
        );
        res.status(200).send('Usuario actualizado exitosamente');
    } catch (error) {
        res.status(400).send('El usuario no pudo ser actualizado');
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        await db.User.destroy({
            where: {id}
        });
        res.status(200).send('Usuario eliminado exitosamente');
    } catch (error) {
        res.status(400).send('El usuario no pudo ser eliminado');
    }
})