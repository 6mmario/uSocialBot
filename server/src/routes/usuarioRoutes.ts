  
import express, { Router } from 'express';

import usuarioController from '../controllers/usuarioController';

class UsuarioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/', usuarioController.create);
        this.router.post('/OAuth', usuarioController.OAuth);
        this.router.put('/:id', usuarioController.update);
        this.router.get('/', usuarioController.todosAmigos);
    }

}

export default new UsuarioRoutes().router;