import  express  from "express";
import {Kpi_Alistamiento, listOtwithOrder, SessionWm, listLt22, Confirm_Ot, GetEntregaDetailWm, GetAlistamientoAcumulado, getZwmLt01, registraPicking} from '../../controllers/transporte/wm.js'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.post(process.env.RUTA_LOGINWM, async (req,res) => {
    const response  = await SessionWm(req.body);    
     res.send(response); 
   });


router.post(process.env.RUTA_KPI_ALISTAMIENTO,async(req, res )=>{
  const  response  = await Kpi_Alistamiento(req.body);
  res.send(response);
});

router.post(process.env.RUTA_OT_DETAIL_ORDER,async(req, res )=>{
  const  response  = await listOtwithOrder(req.body);
  res.send(response);
});


router.post(process.env.RUTA_LT22,async(req, res )=>{
  const  response  = await listLt22(req.body);
  res.send(response);
});

router.post(process.env.RUTA_CONFIRM_OT ,async(req, res )=>{
 
  const  response  = await Confirm_Ot(req.body);
  res.send(response);
});
/**
 * @swagger
 *
 * /transporte/detalleEntrega/{entrega}:
 *   get:
 *     summary: This API obtains the details of the deliveries and their status
 *     tags:
 *       - WM Alistamiento
 *     parameters:
 *       - in: path
 *         name: entrega    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: true
 *         description: delivery number
 *         example: "70335960"  # Cambiado value por example
 *     responses:
 *       200:
 *         description: Data employed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:     # Se agregó la definición de items para el array
 *                     type: object
 *                     properties:  # Aquí puedes definir las propiedades de los objetos en el array
 *                       # ejemplo:
 *                       # id:
 *                       #   type: string
 *                       # status:
 *                       #   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Internal server error
 */
router.get('/transporte/detalleEntrega/:entrega' ,async(req, res )=>{
 
  const  entrega = req.params.entrega;
  
  const  response  = await GetEntregaDetailWm(entrega);
  res.send(response);
});

/**
 * @swagger
 *
 * /transporte/alistamientoAcumulado/{entrega}/{posot}/{ot}:
 *   get:
 *     summary: This API obtains the details of the picking acumulate by ot 
 *     tags:
 *       - WM Alistamiento
 *     parameters:
 *       - in: path
 *         name: entrega    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: true
 *         description: delivery number
 *         example: "70335960" 
  *       - in: path
 *         name: posot    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: true
 *         description: position order transfer
 *         example: "3"
  *       - in: path
 *         name: ot    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: true
 *         description: order transfer number
 *         example: "294202"   
 *     responses:
 *       200:
 *         description: acumulate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:     # Se agregó la definición de items para el array
 *                     type: object
 *                     properties:  # Aquí puedes definir las propiedades de los objetos en el array
 *                       # ejemplo:
 *                       # id:
 *                       #   type: string
 *                       # status:
 *                       #   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Internal server error
 */

router.get('/transporte/alistamientoAcumulado/:entrega/:posot/:ot' ,async(req, res )=>{
 
  const  {entrega, posot, ot } = req.params;
  
  const  response  = await GetAlistamientoAcumulado(entrega, posot, ot);
  res.send(response);
});


/**
 * @swagger
 *
 * /transporte/alistamientoWm/{ubicacionOrigen}/{almacen}/{ubicacionDestino}/{centro}/{cantidad}/{material}/{lote}/{pallet}/{bandera}/{loteDestino}/{usuario}:
 *   get:
 *     summary: This API obtains the details information wm zwmlt01
 *     tags:
 *       - WM Alistamiento
 *     parameters:
 *       - in: path
 *         name: ubicacionOrigen  
 *         schema:
 *           type: string
 *         required: false
 *         description: from location
 *       - in: path
 *         name: almacen    
 *         schema:
 *           type: string
 *         required: false
 *         description: store
 *         example: "1101"
 *       - in: path
 *         name: ubicacionDestino    
 *         schema:
 *           type: string
 *         required: false
 *         description: location to
 *       - in: path
 *         name: centro    
 *         schema:
 *           type: string
 *         required: false
 *         description: location to get inventory
 *       - in: path
 *         name: cantidad  
 *         schema:
 *           type: number
 *         required: false
 *         description: quantity
 *       - in: path
 *         name: material    
 *         schema:
 *           type: string
 *         required: false
 *         description: material
 *       - in: path
 *         name: lote    
 *         schema:
 *           type: string
 *         required: false
 *         description: batch
 *       - in: path
 *         name: pallet  
 *         schema:
 *           type: string
 *         required: false
 *         description: pallet number
 *       - in: path
 *         name: bandera    
 *         schema:
 *           type: string
 *         required: false
 *         description: flag
 *       - in: path
 *         name: loteDestino    
 *         schema:
 *           type: string
 *         required: false
 *         description: batch to
 *       - in: path
 *         name: usuario    
 *         schema:
 *           type: string
 *         required: false
 *         description: user action
 *     responses:
 *       200:
 *         description: acumulate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       material:
 *                         type: string
 *                       cantidad:
 *                         type: number
 *                       ubicacionOrigen:
 *                         type: string
 *                       ubicacionDestino:
 *                         type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Internal server error
 */
router.get('/transporte/alistamientoWm/:ubicacionOrigen/:almacen/:ubicacionDestino/:centro/:cantidad/:material/:lote/:pallet/:bandera/:loteDestino/:usuario' ,async(req, res )=>{
  const  response  = await getZwmLt01(req.params);
  res.send(response);
});

/** 
 * @swagger
 * /transporte/Registraalistamiento:
 *   post:
 *     summary:  picking
 *     description: save data  picking for pallet 
 *     tags:
 *       - WM Alistamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entrega:
 *                 type: string
 *                 example: 70336085
 *               posicion:
 *                 type: string
 *                 example: 90
 *               material:
 *                 type: string
 *                 example: 230021
 *               lote:
 *                 type: string
 *                 example: 0000015650
 *               consestib:
 *                 type: string
 *                 example: 1986064
 *               cantbuena:
 *                 type: string
 *                 example: 55.890
 *               cantrotura:
 *                 type: string
 *                 example: 0
 *               UMBASE:
 *                 type: string
 *                 example: M2
 *               usuario:
 *                 type: string
 *                 example: 9464
 *               bandera:
 *                 type: string
 *                 example: 1
 *               IDX:
 *                 type: string
 *                 example: 00035794
 *               POSOT:
 *                 type: string
 *                 example: 7
 *               OT:
 *                 type: string
 *                 example: 300953
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
 *                   description: validacion exitosa 
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 data:
 *                    type: array
 *       400:
 *         description: Solicitud incorrecta (Bad Request)
 *       401:
 *         description: Autenticación fallida (Unauthorized)
 */
router.post('/transporte/Registraalistamiento/', async(req, res)=>{
  const response = await registraPicking(req.body)
  res.send(response);
})
















export default router