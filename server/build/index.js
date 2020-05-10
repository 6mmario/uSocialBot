"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const publicacionRoutes_1 = __importDefault(require("./routes/publicacionRoutes"));
const myParser = require("body-parser");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('host', process.env.HOSTS || 'localhost');
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        // this.app.use(express.json());
        this.app.use(express_1.default.json({ limit: '200mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '200mb', extended: true }));
        this.app.use(express_1.default.text({ limit: '200mb' }));
    }
    routes() {
        // this.app.use('/', indexRoutes);
        this.app.use('/usuario', usuarioRoutes_1.default);
        this.app.use('/publicacion', publicacionRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on ip: ', this.app.get('host'), 'on  port', this.app.get('port'));
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
