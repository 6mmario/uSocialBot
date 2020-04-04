import { Request, Response } from 'express';
import '../lib/env'
import bcrypt from 'bcrypt';
import pool from '../database';
import { uuid } from 'uuidv4';
import AWS from 'aws-sdk';
// bcrytp
const saltRounds = 12;

// Configuracion S3
const s3 = new AWS.S3({
    accessKeyId: process.env.S3_KEYC,
    secretAccessKey: process.env.S3_SECRETKEY,
    apiVersion: process.env.API_VERSION
});

class UsuarioController {


    // Registro 0-Sin Fotografia, 1-Con Fotografia
    public async create(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const id = req.body.id_usuario;
        const foto = req.body.foto;
        let base64String = req.body.base64;
        let extension = req.body.extension;
        let filename = `${uuid()}.${extension}`;

        // existe?
        result = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', id);

        if (result.length > 0) {
            return res.json({ mensaje: 'Usaurio ya existe' });
        }

        // tiene foto
        if (foto === 1) {
            let encodIMG = base64String;
            let decodIMG = Buffer.from(encodIMG, "base64");

            //Parámetros para S3
            let bucketname = "practica2-26";
            let folder = "fotos/";
            let filepath = `${folder}${filename}`;

            var params = {
                Bucket: bucketname,
                Key: filepath,
                Body: decodIMG,
                ACL: "public-read"
            };

            s3.upload(params, function (s3Err: any, data: any) {
                if (s3Err) {
                    console.log(s3Err);
                } else {
                    delete req.body.base64;
                    delete req.body.extension;
                    delete req.body.foto;

                    bcrypt.hash(req.body.pass, saltRounds).then((hash) => {
                        req.body.pass = hash
                        req.body.urlimagen = data.Location;
                        result = pool.query('INSERT INTO usuario set ?', [req.body]);
                        res.json({ message: 'Usuario guardado' });
                    });
                }
            });
        } else {
            delete req.body.base64;
            delete req.body.extension;
            delete req.body.foto;

            bcrypt.hash(req.body.pass, saltRounds).then((hash) => {
                req.body.pass = hash
                result = pool.query('INSERT INTO usuario set ?', [req.body]);
                res.json({ message: 'Usuario guardado' });
            });
        }

    }

    // login
    public async OAuth(req: Request, res: Response): Promise<any> {
        const id = req.body.id_usuario;
        var pw = req.body.pass;

        const usuario = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', id);
        var hash: any = null;
        if (usuario.length > 0) {
            hash = usuario[0].pass;

            const match = await bcrypt.compare(pw, hash);

            if (match) {
                delete usuario[0].pass;
                return res.json(usuario[0]);
            } else {
                return res.json({ mensaje: 'Error en la contrasenia' });
            }
        }
        res.status(404).json({ text: "Usuario No existe" });
    }

    // Actualiar Usuario
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log([id]);
        const foto = req.body.foto;
        let base64String = req.body.base64;
        let extension = req.body.extension;
        let filename = `${uuid()}.${extension}`;

        // tiene foto
        if (foto === 1) {
            let encodIMG = base64String;
            let decodIMG = Buffer.from(encodIMG, "base64");

            //Parámetros para S3
            let bucketname = "practica2-26";
            let folder = "fotos/";
            let filepath = `${folder}${filename}`;

            var params = {
                Bucket: bucketname,
                Key: filepath,
                Body: decodIMG,
                ACL: "public-read"
            };

            s3.upload(params, function (s3Err: any, data: any) {
                if (s3Err) {
                    console.log(s3Err);
                } else {
                    delete req.body.base64;
                    delete req.body.extension;
                    delete req.body.foto;

                    // pass cambiado
                    if (req.body.pass !== '') {
                        bcrypt.hash(req.body.pass, saltRounds).then((hash) => {
                            req.body.pass = hash
                            req.body.urlimagen = data.Location;
                            pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                            res.json({ message: 'Usuario Modificado' });
                        });
                    } else {
                        delete req.body.pass;
                        req.body.urlimagen = data.Location;
                        pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                        res.json({ message: 'Usuario Modificado' });
                    }
                }
            });
        } else {
            delete req.body.base64;
            delete req.body.extension;
            delete req.body.foto;

            // pass cambiado
            if (req.body.pass !== '') {
                bcrypt.hash(req.body.pass, saltRounds).then((hash) => {
                    req.body.pass = hash
                    pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                    res.json({ message: 'Usuario Modificado' });
                });
            } else {
                delete req.body.pass;
                pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                res.json({ message: 'Usuario Modificado' });
            }
        }
    }
}

const usuarioController = new UsuarioController;
export default usuarioController;