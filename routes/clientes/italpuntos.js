import { buyGiftCard, getCuponList, getGiftCard } from "../../controllers/clientes/italpuntos.js";
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

/**
 * @swagger
 * /clientes/italpuntos/buygifcard/:
 *   post:
 *     summary: Redime gifcard
 *     description: hace la solicitud apprecio para la compra de una gifcard
 *     tags:
 *       - Italpuntos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idGiftcard:
 *                 type: string
 *                 example: "194"
 *               userCode:
 *                 type: string
 *                 example: "1093771589"
 *               bpCode:
 *                 type: string
 *                 example: "0000109476"
 *               userName:
 *                 type: string
 *                 example: "EDWIN BRANDON ORTEGA"
 *               valorgif:
 *                 type: number
 *                 example: 50000
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
router.post('/clientes/italpuntos/buygifcard/', async(req,res)=>{
  let { idGiftcard, userCode, bpCode, userName,  valorgif } = req.body
   let response  = await  buyGiftCard(idGiftcard, userCode, bpCode, userName,  valorgif)
   res.send(response); 
})


export default router