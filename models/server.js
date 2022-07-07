const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/';
        this.authPath     = '/auth'; 
        this.buscar       = '/buscar';

        //Conectar a bse de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();
        //Routes

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );
        //Lectura y parseo del body
        this.app.use( express.json() );
        //Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.buscar, require ('../routes/buscar'));
    }

    listen() {
        this.app.listen(this.port , ()=>{
        console.log('Servidor corriendo en puerto', this.port );
        });
    }
}


module.exports = Server;