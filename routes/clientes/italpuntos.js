import { getCuponList, getGiftCard } from "../../controllers/clientes/italpuntos.js";
import express  from "express";
const router = express.Router();

/**
 * @swagger
 * /clientes/italpuntos/CuponList/:
 *   post:
 *     summary: lista de cupones de italpuntos
 *     description: obtiene la lista de cupones de italpuntos atraves de la api de apprecio
 *     tags:
 *       - Italpuntos
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
router.post('/clientes/italpuntos/CuponList/' , async(req,res)=>{    
   let response  = await  getCuponList();
   res.send(response); 
});

/**
 * @swagger
 * /clientes/italpuntos/getGiftCard/:
 *   post:
 *     summary: lista de cupones de italpuntos
 *     description: obtiene la lista de cupones de italpuntos atraves de la api de apprecio
 *     tags:
 *       - Italpuntos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: string
 *                 example: "194"
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
router.post('/clientes/italpuntos/getGiftCard/' , async(req,res)=>{    
   let id = req.body.id;
   let response  = await  getGiftCard(id);
   res.send(response); 
});


export default router