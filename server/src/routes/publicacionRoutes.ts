import express, { Router } from 'express';

import publicacionController from '../controllers/publicacionController';

class UsuarioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/', publicacionController.create);
        this.router.get('/', publicacionController.todasPublicaciones);
        this.router.get('/:id', publicacionController.traducirPublicacion);
    }

}

export default new UsuarioRoutes().router;