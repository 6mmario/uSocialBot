  
import express, { Router } from 'express';

import usuarioController from '../controllers/usuarioController';

class UsuarioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        // this.router.get('/:id', gamesController.getOne);
        this.router.post('/', usuarioController.create);
        // this.router.put('/:id', gamesController.update);
        // this.router.delete('/:id', gamesController.delete);
    }

}

export default new UsuarioRoutes().router;