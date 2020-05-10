import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes';
import publicacionRoutes from './routes/publicacionRoutes';
const myParser = require("body-parser");

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('host', process.env.HOSTS || 'localhost');
        this.app.use(morgan('dev'));
        this.app.use(cors());
       // this.app.use(express.json());
        this.app.use(express.json({ limit: '200mb' }));
        this.app.use(express.urlencoded({ limit: '200mb', extended: true }));
        this.app.use(express.text({ limit: '200mb' }));
    }

    routes(): void {
        // this.app.use('/', indexRoutes);
        this.app.use('/usuario', usuarioRoutes);
        this.app.use('/publicacion', publicacionRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on ip: ', this.app.get('host'),'on  port', this.app.get('port'));
            console.log(process.env.HOST);
            console.log(process.env.UDATABASE);
            console.log(process.env.PASSWORD);
            console.log(process.env.DATABASE);
            console.log(process.env.PUERTO);
        });
    }
}

const server = new Server();
server.start();