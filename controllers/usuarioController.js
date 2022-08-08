import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina : 'Iniciar Sesión'
    })
};

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: "Crear Cuenta",
        csrfToken: req.csrfToken()
    });
};

const registrar = async(req, res) => {
    //Validacion
    await check('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .run(req);
    await check('email')
        .isEmail()
        .withMessage('El email es incorrecto')
        .run(req);
    await check('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
        .run(req);
    await check("repite_password")
        .equals(req.body.password)
        .withMessage("Las contraseñas no son la mismas")
        .run(req);

    let resultado = validationResult(req);

    // Verificar que el resultado este vacio
    if (!resultado.isEmpty()){
        // Errores
        return res.render("auth/registro", {
            pagina: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        });
    }

    // Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where: {email: req.body.email} })

    console.log(existeUsuario);

    const usuario = await Usuario.create(req.body);
    res.json(usuario);
};

const formularioOlvidePassword = (req, res) => {
    res.render("auth/olvide-password", {
        pagina: "Recupera tu acceso a bienes raíces",
    });
};

export { 
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
};