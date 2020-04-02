import { Request, Response } from 'express';
import '../lib/env'
import bcrypt from 'bcrypt';
import pool from '../database';

// bcrytp
const saltRounds = 12;
class UsuarioController {

    public async create(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const id = req.body.id_usuario;
        
        // existe?
        result = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', id);
        
        if (result.length > 0) {
            return res.json({mensaje: 'Usaurio ya existe'});
        }

        // registro
        var pw = req.body.pass;
        let hash = await bcrypt.hash(pw, saltRounds).then( (hash) =>
         {
            return hash
        });

        console.log('este es el hash ' , hash);

        req.body.pass = hash
        result = await pool.query('INSERT INTO usuario set ?', [req.body]);
        res.json({ message: 'Usuario guardado' });
        
    }

    

        public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        console.log(games.length);
        if (games.length > 0) {
            return res.json(games[0]);
        }
        res.status(404).json({ text: "The game doesn't exits" });
    }


    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The game was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }

}

const usuarioController = new UsuarioController;
export default usuarioController;