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

class PublicacionController {

    // Crear 0-Sin Fotografia, 1-Con Fotografia
    public async create(req: Request, res: Response): Promise<any> {
        var result: any = null;
        const foto = req.body.imagen;
        let base64String = req.body.base64;
        let extension = req.body.extension;
        let filename = `${uuid()}.${extension}`;


        // tiene foto
        if (foto === 1) {
            let encodIMG = base64String;
            let decodIMG = Buffer.from(encodIMG, "base64");

            //Parámetros para S3
            let bucketname = "practica2-26";
            let folder = "publicaciones/";
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
                    delete req.body.imagen;

                    const now = new Date();
                    req.body.fecha = now;
                    req.body.urlimagen = data.Location;
                    result = pool.query('INSERT INTO publicacion set ?', [req.body]);
                    res.json({ message: 'Publicacion Guardada' });
                }
            });
        } else {
            delete req.body.base64;
            delete req.body.extension;
            delete req.body.imagen;

            const now = new Date();
            req.body.fecha = now;
            result = pool.query('INSERT INTO publicacion set ?', [req.body]);
            res.json({ message: 'Publicacion Guardada' });
        }
    }

    // Mostrar Todo
    public async todasPublicaciones(req: Request, res: Response): Promise<void> {
        const result  = await pool.query('SELECT * FROM publicacion order by fecha DESC');
        res.json(result);
    }
}

const publicacionController = new PublicacionController;
export default publicacionController;