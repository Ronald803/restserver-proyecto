const express = require('express')
const cors = require('cors')
class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT; 

        //Middlewares
        this.middlewares();
        //Routes

        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );
        //Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.get('/servicios/salones', (req,res) => {
            res.send('Solicitud GET a salones');
        });
        this.app.put('/servicios/salones', (req,res) => {
            res.send('Solicitud PUT a salones');
        });
        this.app.post('/servicios/salones', (req,res) => {
            res.send('Solicitud POST a salones');
        });
        this.app.delete('/servicios/salones', (req,res) => {
            res.send('Solicitud DELETE a salones');
        });



        this.app.get('/servicios/comida', (req,res) => {
            res.send('Solicitud GET a comida');
        });
        this.app.put('/servicios/comida', (req,res) => {
            res.send('Solicitud PUT a comida');
        });
        this.app.post('/servicios/comida', (req,res) => {
            res.send('Solicitud POST a comida');
        });
        this.app.delete('/servicios/comida', (req,res) => {
            res.send('Solicitud DELETE a comida');
        });


        this.app.get('/servicios/musica', (req,res) => {
            res.send('Solicitud GET a musica');
        });
        this.app.put('/servicios/musica', (req,res) => {
            res.send('Solicitud PUT a musica');
        });
        this.app.post('/servicios/musica', (req,res) => {
            res.send('Solicitud POST a musica');
        });
        this.app.delete('/servicios/musica', (req,res) => {
            res.send('Solicitud DELETE a musica');
        });



        this.app.get('/servicios/bartender', (req,res) => {
            res.send('Solicitud GET a bartender');
        });
        this.app.put('/servicios/bartender', (req,res) => {
            res.send('Solicitud PUT a bartender');
        });
        this.app.post('/servicios/bartender', (req,res) => {
            res.send('Solicitud POST a bartender');
        });
        this.app.delete('/servicios/bartender', (req,res) => {
            res.send('Solicitud DELETE a bartender');
        });



    }

    listen() {
        this.app.listen(this.port , ()=>{
        console.log('Servidor corriendo en puerto', this.port );
        });
    }
}


module.exports = Server;