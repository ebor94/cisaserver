import { buyGiftCard, getCuponList, getGiftCard, RegistrarItalPuntos } from "../../controllers/clientes/italpuntos.js";
import express  from "express";
const router = express.Router();

/**
 * @swagger
 * /clientes/italpuntos/CuponList/:
 *   post:
 *     summary: lista de cupones de italpuntos
 *     description: obtiene la lista de cupones de italpuntos atraves de la api de apprecio
 *     tags:
 *       - ItalPuntos
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
 *       - ItalPuntos
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
 *       - ItalPuntos
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
/**
 * @swagger
 * /clientes/italpuntos/registrar:
 *   post:
 *     summary: Registra puntos para un cliente
 *     tags: 
 *       - ItalPuntos
 *     description: Registra los puntos acumulados para un cliente basado en el consecutivo y pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - consecutivo
 *               - pedido
 *               - codBp
 *             properties:
 *               consecutivo:
 *                 type: string
 *                 description: Número de consecutivo de la operación
 *                 example: "CON001"
 *               pedido:
 *                 type: string
 *                 description: Número de pedido asociado
 *                 example: "PED123"
 *               codBp:
 *                 type: string
 *                 description: Código del cliente
 *                 example: "CLI456"
 *     responses:
 *       200:
 *         description: Puntos registrados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 comision:
 *                   type: number
 *                   description: Cantidad de puntos registrados
 *                   example: 5000
 *                 detalles:
 *                   type: object
 *                   properties:
 *                     totalNeto:
 *                       type: number
 *                       example: 500000
 *                     porcentajeComision:
 *                       type: string
 *                       example: "1%"
 *                     comisionFormateada:
 *                       type: string
 *                       example: "$5.000"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Parámetros incompletos"
 *                 comision:
 *                   type: number
 *                   example: 0
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 *                 comision:
 *                   type: number
 *                   example: 0
 */
router.post('/clientes/italpuntos/registrar/', async(req,res)=>{
   let { consecutivo,pedido,codBp} = req.body
    let response  = await  RegistrarItalPuntos(consecutivo,pedido,codBp);
    res.send(response);  
 })
 

export default router