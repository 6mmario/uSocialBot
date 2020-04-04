import express, { Router } from 'express';

import publicacionController from '../controllers/publicacionController';

class UsuarioRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/index', publicacionController.index);
        this.router.post('/', publicacionController.create);
        this.router.post('/OAuth', publicacionController.OAuth);
        this.router.put('/:id', publicacionController.update);
        
    }

}

export default new UsuarioRoutes().router;