import express, { Router } from 'express';

import publicacionController from '../controllers/publicacionController';

class UsuarioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/' , publicacionController.create);
        this.router.get('/:id', publicacionController.traducirPublicacion);
        this.router.get('/mis/:id', publicacionController.todasPublicaciones);
        
    }

}

export default new UsuarioRoutes().router;