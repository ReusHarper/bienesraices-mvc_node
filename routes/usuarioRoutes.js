import express from "express";
import {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword,
} from "../controllers/usuarioController.js";

const router = express.Router();

// Routing
/* 
router.get("/", (req, res) => {
    res.json({ mensaje: "Hola mundo en express :D" });
});

router.post("/", (req, res) => {
    res.json({ mensaje : 'Respuesta de tipo Post' });
});
 */

// Otra forma de escribirlo:
/* 
router.route('/')
    .get((req, res) => {
        res.json({ mensaje: "Hola mundo en express :D" });
    })
    .post((req, res) => {
        res.json({ mensaje: "Respuesta de tipo Post" });
    });
*/

// send - Envia la información a la ruta especificada
/*
router.get("/nosotros", (req, res) => {
    res.send("Información de nosotros");
});
*/

// render - Muestra una vista mediante un template engine
router.get('/login', formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/olvide-password", formularioOlvidePassword);

export default router;