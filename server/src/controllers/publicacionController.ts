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

const translate = new AWS.Translate({
    accessKeyId: process.env.Translate_KEYC,
    secretAccessKey: process.env.Translate_SECRETKEY,
    region: 'us-east-2'
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
        const id = req.params.id;
        const result = await pool.query(`SELECT p.id_publicacion, p.fecha, p.texto, p.urlimagen, u.nickname
        FROM publicacion p
        INNER JOIN usuario u ON u.id_usuario = p.usuario_id_usuario
        WHERE p.usuario_id_usuario IN (
        SELECT a.usuario_id_usuario1 FROM amistad a WHERE p.usuario_id_usuario='${id}')
        ORDER BY p.fecha DESC
        ;`);
        res.json(result);
    }

    // traducir texto
    public async traducirPublicacion(req: Request, res: Response): Promise<any> {
        const id = req.params.id;
        const result = await pool.query(`SELECT * FROM publicacion WHERE id_publicacion = ${id}`)

        const text = result[0].texto;

        let params = {
            SourceLanguageCode: 'auto',
            TargetLanguageCode: 'en',
            Text: text
        };

        translate.translateText(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                res.json(err)
            } else {
                console.log(data.TranslatedText);
                res.json(data.TranslatedText)
            }
        });

    }
}

const publicacionController = new PublicacionController;
export default publicacionController;