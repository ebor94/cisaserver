import express  from "express";
import { GetInvoiceController, GetQuoteHead, PostOrderReference ,
    CreateConsecutiveController,
    CreateDetailController,
    GetDetailController,
    DelPosDetailController,
    FinishSalesController,
    GetCentroCiudadController} from "../../controllers/clientes/invoice.js";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post(process.env.RUTA_INVOICE , async(req,res)=>{    
   const data = req.body;
   //console.log(codsap)
    const response  = await GetInvoiceController(data)
    res.send(response); 
});

/**
 * @swagger
 * /clientes/quote/:
 *   post:
 *     summary: informacion tabla zsd_cotizacionHD
 *     description: Endpoint validar informacion de  zsd_cotizacionHD con parámetros específicos
 *     tags:
 *       - Comercial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - BANDERA
 *               - OFERTA
 *               - MARGENALIADO
 *               - MARGENINTERNO
 *               - TOKEN
 *               - RESPUESTAWP
 *               - USUARIOAPROB
 *               - FILTRO
 *               - CODBP
 *             properties:
 *               BANDERA:
 *                 type: string
 *                 description: Indicador de tipo de cotización
 *                 example: "13"
 *               OFERTA:
 *                 type: string
 *                 description: Código de la oferta
 *                 example: ""
 *               MARGENALIADO:
 *                 type: string
 *                 description: Margen para aliados comerciales
 *                 example: ""
 *               MARGENINTERNO:
 *                 type: string
 *                 description: Margen interno de la operación
 *                 example: ""
 *               TOKEN:
 *                 type: string
 *                 description: Token de autenticación
 *                 example: ""
 *               RESPUESTAWP:
 *                 type: string
 *                 description: Respuesta del sistema WP
 *                 example: ""
 *               USUARIOAPROB:
 *                 type: string
 *                 description: Usuario que aprueba la cotización
 *                 example: ""
 *               FILTRO:
 *                 type: string
 *                 description: Filtro aplicado a la cotización tipo documento
 *                 example: ""
 *               CODBP:
 *                 type: string
 *                 description: Código de business partner
 *                 example: "0000102495"
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Respuesta exitosa"
 *                 data:
 *                   type: object
 *                   properties:
 *                     quoteId:
 *                       type: string
 *                       example: "QT-2024-001"
 *       400:
 *         description: Error en los parámetros de entrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.post(process.env.RUTA_HEAD_QUOTE, async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await GetQuoteHead(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_ORDER_REFERENCE, async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await PostOrderReference(data);
     res.send(response); 
 });



 /** rutas proceso para pedidos */

 router.post(process.env.RUTA_CONSECUTIVE , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await CreateConsecutiveController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_CREATE_DETAIL , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await CreateDetailController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_DEL_DETAIL , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await DelPosDetailController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_FINISH_SALE , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await FinishSalesController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_GET_DETAIL , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await GetDetailController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_INFO_CIUDAD , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await GetCentroCiudadController(data);
     res.send(response); 
 });









export default router