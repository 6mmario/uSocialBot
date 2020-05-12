"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', usuarioController_1.default.create);
        this.router.post('/OAuth', usuarioController_1.default.OAuth);
        this.router.post('/amistad', usuarioController_1.default.amistad);
        this.router.put('/:id', usuarioController_1.default.update);
        this.router.get('/misAmigos/:id', usuarioController_1.default.misAmigos);
        this.router.get('/todos/amigos/:id', usuarioController_1.default.todosAmigos);
        this.router.get('/:id', usuarioController_1.default.myData);
        this.router.delete('/eliminar/:id1/:id2', usuarioController_1.default.deleteAmigo);
    }
}
exports.default = new UsuarioRoutes().router;
