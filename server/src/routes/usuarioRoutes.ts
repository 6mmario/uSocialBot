  
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
        this.router.post('/amistad', usuarioController.amistad);
        this.router.put('/:id', usuarioController.update);
        
        this.router.get('/misAmigos/:id', usuarioController.misAmigos);
        this.router.get('/todos/amigos/:id', usuarioController.todosAmigos);
        this.router.get('/:id', usuarioController.myData);
    }

}

export default new UsuarioRoutes().router;