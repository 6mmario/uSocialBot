"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../lib/env");
const database_1 = __importDefault(require("../database"));
const uuidv4_1 = require("uuidv4");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// bcrytp
const saltRounds = 12;
// Configuracion S3
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.S3_KEYC,
    secretAccessKey: process.env.S3_SECRETKEY,
    apiVersion: process.env.API_VERSION
});
class PublicacionController {
    // Crear 0-Sin Fotografia, 1-Con Fotografia
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = null;
            const foto = req.body.imagen;
            let base64String = req.body.base64;
            let extension = req.body.extension;
            let filename = `${uuidv4_1.uuid()}.${extension}`;
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
                s3.upload(params, function (s3Err, data) {
                    if (s3Err) {
                        console.log(s3Err);
                    }
                    else {
                        delete req.body.base64;
                        delete req.body.extension;
                        delete req.body.imagen;
                        const now = new Date();
                        req.body.fecha = now;
                        req.body.urlimagen = data.Location;
                        result = database_1.default.query('INSERT INTO publicacion set ?', [req.body]);
                        res.json({ message: 'Publicacion Guardada' });
                    }
                });
            }
            else {
                delete req.body.base64;
                delete req.body.extension;
                delete req.body.imagen;
                const now = new Date();
                req.body.fecha = now;
                result = database_1.default.query('INSERT INTO publicacion set ?', [req.body]);
                res.json({ message: 'Publicacion Guardada' });
            }
        });
    }
    // Mostrar Todo
    todasPublicaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT p.id_publicacion AS PUBLICACION, p.fecha AS FECHA, p.texto AS TEXTO, p.urlimagen AS IPUBLICACION, u.urlimagen AS IUSUARIO, u.nickname AS NICKNAME FROM publicacion p INNER JOIN usuario u ON p.USUARIO_id_usuario = u.id_usuario ORDER BY fecha DESC');
            delete result.USUARIO_id_usuario;
            delete result.id_usuario;
            delete result.nombre;
            delete result.pass;
            
            res.json(result);
        });
    }
}
const publicacionController = new PublicacionController;
exports.default = publicacionController;
