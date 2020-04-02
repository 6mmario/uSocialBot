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
        // this.router.get('/:id', gamesController.getOne);
        this.router.post('/', usuarioController_1.default.create);
        // this.router.put('/:id', gamesController.update);
        // this.router.delete('/:id', gamesController.delete);
    }
}
exports.default = new UsuarioRoutes().router;
