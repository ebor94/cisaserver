import express  from "express";
import { Cliente } from "../../services/sap/clientes";
const router = express.Router();


/**
 * @swagger
 * /clientes/getcliente/:
 *   post:
 *     summary: Información de cliente
 *     description: obtiene la información de un cliente enviando el numero de cedula y consultando el servicio de SAP
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cc]
 *             properties:
 *               cc:
 *                 type: string
 *                 example: "1093771589"
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo del resultado
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Array con los datos de respuesta
 */
router.post('/clientes/getcliente/' , async(req,res)=>{    
    let response  = await  Cliente.getinfo(req.body.cc);
    res.send(response); 
 });