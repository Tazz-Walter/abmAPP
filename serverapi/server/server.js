require('./config/config');

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const _ = require('lodash');

const app = express();

var User = require('./models/user');
var port = process.env.PORT;


app.use(bodyParser.json());
app.use((req, res, next) =>  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//crea un nuevo usuario cumpliendo el modelo sino falla
// var newUser = new User({
//     email: 'alicia@gmail.ar',
//     username: 'Walterio',
//     password: 'algunapass'
// });

//alta a la base de datos
app.post('/api/guardar', async (req, res) => {
    // console.log(req.body);
    var newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        
    });

    await newUser.save().then((doc) => {
        console.log('Saved user');
        res.status(200).send(doc);
    }, (e) => {
        console.log('unable to save user', e);
    });
});

//retornar todo de la base de datos
app.get('/api/listado', function (req, res, next) {
    User.find({}).then((usuario) => {
        // console.log('usuarios registrados', usuario);
        res.json(usuario);
    }, (e) => {
        console.log('unable to return users', e);
    });
});

//para modificar un usuario
app.patch('/api/modificar/:id', (req, res, next) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findOne({_id: id}).then((user) => {
        user.email = req.body.email,
        user.username= req.body.username,
        user.password= req.body.password,
    
        user.save().then((doc) => {
        console.log('Saved user');
        res.status(200).send(doc);
        }, (e) => {
            console.log('unable to save user', e.message);
            res.status(404).send();
        });
    }, (e) => {
        console.log('no se pudo actualizar', e.message);
        res.status(404).send();
    }); 
});

//borrar un usuario de la base de datos
app.delete('/api/borrar/:id', async (req, res, next) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {        
        return res.status(404).send();
    }
    try {
        const borrado = await User.findOneAndRemove({ _id: id });
        if (!borrado) {
            return res.status(404).send();
        }
        res.status(200).send({ borrado });
        console.log('Borrado');
    } catch (error) {
        console.log('error fatal', error);
        res.status(400).send();
    }
    
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports.app = { app };