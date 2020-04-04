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
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    //Pruebas
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let now = new Date();
            console.log('La fecha actual es', now);
            console.log('UNIX time:', now.getTime());
            res.json(now);
        });
    }
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
                delete req.body.foto;
                var now = new Date();
                req.body.fecha = now;
                bcrypt_1.default.hash(req.body.pass, saltRounds).then((hash) => {
                    req.body.pass = hash;
                    result = database_1.default.query('INSERT INTO usuario set ?', [req.body]);
                    res.json({ message: 'Usuario guardado' });
                });
            }
        });
    }
    // login
    OAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id_usuario;
            var pw = req.body.pass;
            const usuario = yield database_1.default.query('SELECT * FROM usuario WHERE id_usuario = ?', id);
            var hash = null;
            if (usuario.length > 0) {
                hash = usuario[0].pass;
                const match = yield bcrypt_1.default.compare(pw, hash);
                if (match) {
                    delete usuario[0].pass;
                    return res.json(usuario[0]);
                }
                else {
                    return res.json({ mensaje: 'Error en la contrasenia' });
                }
            }
            res.status(404).json({ text: "Usuario No existe" });
        });
    }
    // Actualiar Usuario
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log([id]);
            const foto = req.body.foto;
            let base64String = req.body.base64;
            let extension = req.body.extension;
            let filename = `${uuidv4_1.uuid()}.${extension}`;
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
                s3.upload(params, function (s3Err, data) {
                    if (s3Err) {
                        console.log(s3Err);
                    }
                    else {
                        delete req.body.base64;
                        delete req.body.extension;
                        delete req.body.foto;
                        // pass cambiado
                        if (req.body.pass !== '') {
                            bcrypt_1.default.hash(req.body.pass, saltRounds).then((hash) => {
                                req.body.pass = hash;
                                req.body.urlimagen = data.Location;
                                database_1.default.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                                res.json({ message: 'Usuario Modificado' });
                            });
                        }
                        else {
                            delete req.body.pass;
                            req.body.urlimagen = data.Location;
                            database_1.default.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                            res.json({ message: 'Usuario Modificado' });
                        }
                    }
                });
            }
            else {
                delete req.body.base64;
                delete req.body.extension;
                delete req.body.foto;
                // pass cambiado
                if (req.body.pass !== '') {
                    bcrypt_1.default.hash(req.body.pass, saltRounds).then((hash) => {
                        req.body.pass = hash;
                        database_1.default.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                        res.json({ message: 'Usuario Modificado' });
                    });
                }
                else {
                    delete req.body.pass;
                    database_1.default.query('UPDATE usuario set ? WHERE id_usuario = ?', [req.body, id]);
                    res.json({ message: 'Usuario Modificado' });
                }
            }
        });
    }
}
const publicacionController = new PublicacionController;
exports.default = publicacionController;
