import  express  from "express";
import dotenv from 'dotenv'
dotenv.config()

import  {LoginSap,LoginDomain, logsLogin, GetZcisaparmetros} from "../../controllers/login/index.js";
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




export default router;