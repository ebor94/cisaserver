import  express  from "express";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

import  {LoginSap,LoginDomain, logsLogin, GetZcisaparmetros} from "../../controllers/login/index.js";
import { GetCliente } from "../../controllers/clientes/index.js";
const router = express.Router();
/**
 * @swagger
 * /loginsap:
 *   post:
 *     summary: Iniciar sesión en SAP
 *     description: Autentica un usuario contra el sistema SAP proporcionando un usuario y una contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: BORTEGA
 *               codvend:
 *                 type: string
 *                 example: ""
 *               password:
 *                 format: password
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *       400:
 *         description: Solicitud incorrecta (Bad Request)
 *       401:
 *         description: Autenticación fallida (Unauthorized)
 */

router.post(process.env.RUTA_LOGIN_SAP , async (req,res) => {
   const response  = await LoginSap(req.body);    
    res.send(response); 
  });

router.post(process.env.RUTA_LOGIN_AD, async  (req, res)=>{
   await  LoginDomain(req, res);
  //console.log(response)    
  //  res.send(response); 
 
})

router.post(process.env.RUTA_LOG_LOGIN, async(req, res)=>{
  const response  = await logsLogin(req, res)
    res.send(response);
})

router.post(process.env.RUTA_CISAPARMETROS , async(req, res)=>{
  const response  = await GetZcisaparmetros(req, res)
    res.send(response);
})

/**
 * @swagger
 * /auth/login/italpuntos:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Autenticación de usuario con Italpuntos
 *     description: Endpoint para autenticar usuarios mediante código de usuario y código BP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userCode
 *               - bpCode
 *             properties:
 *               userCode:
 *                 type: string
 *                 description: Código de usuario *
 *                 example: "1093771589"
 *               bpCode:
 *                 type: string
 *                 description: Código BP del cliente *
 *                 example: "0000109476"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenSesion:
 *                   type: string
 *                   description: Token JWT de sesión
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Autenticación fallida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token inválido"
 */
router.post('/login/italpuntos',async (req, res)=>{
  const { userCode, bpCode } = req.body;
  const usuario = (await GetCliente(userCode)).data;
  if (!usuario || usuario[0].kunnr !== bpCode) {
    return res.status(401).json({ message: 'Datos invalidos' });
  }
  const tokenSesion = jwt.sign(
    { userCode: usuario[0].codigoUsuario, cedula: usuario[0].stcd1 },
    process.env.Private_Token_apprecio,
    { expiresIn: '1h' }
  );

  res.json({ tokenSesion });
});




export default router;