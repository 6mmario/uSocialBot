"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacionController_1 = __importDefault(require("../controllers/publicacionController"));
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/index', publicacionController_1.default.index);
        this.router.post('/', publicacionController_1.default.create);
        this.router.post('/OAuth', publicacionController_1.default.OAuth);
        this.router.put('/:id', publicacionController_1.default.update);
    }
}
exports.default = new UsuarioRoutes().router;
