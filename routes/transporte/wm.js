import  express  from "express";
import {Kpi_Alistamiento, listOtwithOrder, SessionWm, listLt22, Confirm_Ot, GetEntregaDetailWm, GetAlistamientoAcumulado, getZwmLt01, registraPicking, WeightDelivery, getInfoMt, getInfoIngresoMt, registrarIngresoMt} from '../../controllers/transporte/wm.js'
import dotenv from 'dotenv'
import { validateToken } from "../../services/jwt/index.js";
dotenv.config()
const router = express.Router();

/**
 * @swagger
 * /transporte/sesionwm:
 *   post:
 *     summary: Iniciar sesión en WM
 *     description: Autentica un usuario y devuelve un token JWT para acceder a las rutas protegidas
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - contraseña
 *               - bandera
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "usuario123"
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "clave123"
 *               bandera:
 *                 type: string
 *                 description: Valor de control para el tipo de autenticación
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   type: object
 *                   description: Información del usuario autenticado
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Identificador del usuario
 *                       example: "9979"
 *                     nombre:
 *                       type: string
 *                       description: Nombre del usuario
 *                       example: "Juan Pérez"
 *       400:
 *         description: Datos incompletos o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Faltan datos requeridos"
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Usuario o contraseña incorrectos"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
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

/**
 * @swagger
 * /transporte/apruebaOt/:
 *   post:
 *     summary: Confirmacion Orden de transporte
 *     description: Confirmacion Orden de transporte
 *     tags:
 *       - WM Alistamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [entrega, ot, posicion]
 *             properties:
 *               entrega:
 *                 type: string
 *                 example: "60621697"
 *               ot:
 *                 type: string
 *                 example: "302407"
 *               posicion:
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
 *       400:
 *         description: Solicitud incorrecta (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       401:
 *         description: Autenticación fallida (Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
router.post('/transporte/apruebaOt/' ,async(req, res )=>{ 
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
 *     summary: Registro de picking
 *     description: Guarda datos de picking para pallet
 *     tags:
 *       - WM Alistamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [entrega, posicion, material, lote, consestib, cantbuena, cantrotura, UMBASE, usuario, bandera, IDX, POSOT, OT, TPLECTURA]
 *             properties:
 *               entrega:
 *                 type: string
 *                 example: "70336085"
 *               posicion:
 *                 type: string
 *                 example: "90"
 *               material:
 *                 type: string
 *                 example: "230021"
 *               lote:
 *                 type: string
 *                 example: "0000015650"
 *               consestib:
 *                 type: string
 *                 example: "1986064"
 *               cantbuena:
 *                 type: number
 *                 format: float
 *                 example: 55.890
 *               cantrotura:
 *                 type: number
 *                 format: float
 *                 example: 0
 *               UMBASE:
 *                 type: string
 *                 example: "M2"
 *               usuario:
 *                 type: string
 *                 example: "9464"
 *               bandera:
 *                 type: string
 *                 example: "1"
 *               IDX:
 *                 type: string
 *                 example: "00035794"
 *               POSOT:
 *                 type: string
 *                 example: "7"
 *               OT:
 *                 type: string
 *                 example: "300953"
 *               TPLECTURA:
 *                 type: string
 *                 example: "A"
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
 *       400:
 *         description: Solicitud incorrecta (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       401:
 *         description: Autenticación fallida (Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
router.post('/transporte/Registraalistamiento/', async(req, res)=>{
  const response = await registraPicking(req.body)
  res.send(response);
})
/**
 * @swagger
 *
 * /transporte/pesoentrega/{entrega}/:
 *   get:
 *     summary: This API obtains weight of delivery 
 *     tags:
 *       - WM Alistamiento
 *     parameters:
 *       - in: path
 *         name: entrega    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: true
 *         description: delivery number
 *         example: "60629596" 
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
router.get('/transporte/pesoentrega/:entrega',async(req, res )=>{
  const  {entrega } = req.params;
  const response  = await WeightDelivery(entrega);
  res.send(response);
});

/**  
 * @swagger  
 * /transporte/ingreso-mt/{entrega}/{centro}:  
 *   get:
 *     tags:
 *       - WM Alistamiento  
 *     summary: Obtener información de transporte e ingreso MT  
 *     description: Recupera información relacionada con el transporte y el ingreso MT basado en los parámetros de entrega y centro.  
 *     parameters:  
 *       - name: entrega  
 *         in: path  
 *         required: true  
 *         description: Número de entrega.
 *         example: "0070334079"  
 *         schema:  
 *           type: string  
 *       - name: centro  
 *         in: path  
 *         required: true  
 *         description: Código del centro.
 *         example: "1200"  
 *         schema:  
 *           type: string  
 *     responses:  
 *       200:  
 *         description: Respuesta exitosa con la información solicitada.  
 *         content:  
 *           application/json:  
 *             schema:  
 *               type: object  
 *               properties:  
 *                 success:  
 *                   type: boolean  
 *                   description: Indica si la operación fue exitosa.  
 *                 data:  
 *                   type: array  
 *                   items:  
 *                     type: object  
 *                     properties:  
 *                       VBELN:  
 *                         type: string  
 *                         description: Número de entrega.  
 *                       MATNR:  
 *                         type: string  
 *                         description: Número de material.  
 *                       CHARG:  
 *                         type: string  
 *                         description: Número de lote.  
 *                       CENTRO_ING:  
 *                         type: string  
 *                         description: Centro de ingreso.  
 *                       LGORT:  
 *                         type: string  
 *                         description: Almacén.  
 *                       POS_ENTREGA:  
 *                         type: string  
 *                         description: Posición de entrega.  
 *                       CANTIDAD:  
 *                         type: string  
 *                         description: Cantidad.  
 *       400:  
 *         description: Solicitud inválida (parámetros faltantes o incorrectos).  
 *       500:  
 *         description: Error interno del servidor.  
 */
router.get('/transporte/ingreso-mt/:entrega/:centro',async(req, res)=>{
  const {entrega, centro} = req.params;
  const response = await getInfoMt(entrega, centro);
  res.send(response);

})

/**  
 * @swagger  
 * /transporte/ingreso-mt-info/: 
 *   get:  
 *     summary: Obtener información de ingreso MT  
 *     description: Recupera información relacionada con el ingreso MT basado en los parámetros proporcionados.  
 *     tags:  
 *       - WM Alistamiento  
 *     security:
 *       - bearerAuth: [] 
 *     parameters:  
 *       - name: consecutivo  
 *         in: query  
 *         required: false  
 *         description: Número de consecutivo.
 *         example: "0001901524"  
 *         schema:  
 *           type: string  
 *       - name: estado  
 *         in: query  
 *         required: false  
 *         description: Estado del ingreso.
 *         example: "L"  
 *         schema:  
 *           type: string  
 *       - name: centro  
 *         in: query  
 *         required: false  
 *         description: Código del centro.
 *         example: "1200"  
 *         schema:  
 *           type: string  
 *       - name: almacen  
 *         in: query  
 *         required: false  
 *         description: Código del almacén.
 *         example: "1201"   
 *         schema:  
 *           type: string  
 *       - name: entrega  
 *         in: query  
 *         required: false  
 *         description: Número de entrega.
 *         example: "0070334079"   
 *         schema:  
 *           type: string  
 *     responses:  
 *       200:  
 *         description: Respuesta exitosa con la información solicitada.  
 *         content:  
 *           application/json:  
 *             schema:  
 *               type: object  
 *               properties:  
 *                 success:  
 *                   type: boolean  
 *                   description: Indica si la operación fue exitosa.  
 *                 data:  
 *                   type: array  
 *                   items:  
 *                     type: object  
 *                     properties:  
 *                       Consecutivo:  
 *                         type: string  
 *                         description: Número de pallet.  
 *                       Estado:  
 *                         type: string  
 *                         description: Estado del pallet.  
 *                       Centro:  
 *                         type: string  
 *                         description: Código del centro.  
 *                       Almacen:  
 *                         type: string  
 *                         description: Código del almacén.  
 *                       Entrega:  
 *                         type: string  
 *                         description: Número de entrega.  
 *       400:  
 *         description: Solicitud inválida (parámetros faltantes o incorrectos).  
 *       500:  
 *         description: Error interno del servidor.  
 */
router.get('/transporte/ingreso-mt-info/', validateToken,async (req, res) => {
  const {consecutivo, estado, centro, almacen, entrega} = req.query;
  const response = await getInfoIngresoMt(consecutivo, estado, centro, almacen, entrega);
  res.send(response);

})

/**  
 * @swagger  
 * /transporte/ingreso-mt-reg/:  
 *   post:  
 *     summary: Registrar ingreso MT  
 *     description: Registra un ingreso MT por pallet.  
 *     tags:  
 *       - WM Alistamiento  
 *     requestBody:  
 *       required: true  
 *       content:  
 *         application/json:  
 *           schema:  
 *             type: object  
 *             properties:  
 *               VBELN:  
 *                 type: string  
 *                 description: Número de entrega.  
 *                 example: "0070334079"  
 *               MATNR:  
 *                 type: string  
 *                 description: Número de material.  
 *                 example: "000000000000203033"  
 *               CHARG:  
 *                 type: string  
 *                 description: Número de lote.  
 *                 example: "0000008067"  
 *               PALLET:  
 *                 type: string  
 *                 description: Número de pallet.  
 *                 example: "0001901524"  
 *               CENTRO_ING:  
 *                 type: string  
 *                 description: Centro de ingreso.  
 *                 example: "1200"  
 *               LGORT:  
 *                 type: string  
 *                 description: Almacén.  
 *                 example: "1201"  
 *               UBICACION1:  
 *                 type: string  
 *                 description: Primera ubicación.  
 *                 example: "U001"  
 *               UBICACION2:  
 *                 type: string  
 *                 description: Segunda ubicación.  
 *                 example: "U002"  
 *               POS_ENTREGA:  
 *                 type: string  
 *                 description: Posición de entrega.  
 *                 example: "900003"  
 *               CANTIDAD:  
 *                 type: string  
 *                 description: Cantidad.  
 *                 example: "90.72"  
 *               COD_USUARIO:  
 *                 type: string  
 *                 description: Código del usuario.  
 *                 example: "9979"  
 *               BANDERA:  
 *                 type: string  
 *                 description: Bandera de control.  
 *                 example: "1"  
 *     responses:  
 *       200:  
 *         description: Respuesta exitosa con los datos registrados.  
 *         content:  
 *           application/json:  
 *             schema:  
 *               type: object  
 *               properties:  
 *                 success:  
 *                   type: boolean  
 *                   description: Indica si la operación fue exitosa.  
 *                 data:  
 *                   type: object  
 *                   description: Datos registrados.  
 *       400:  
 *         description: Solicitud inválida (datos faltantes o incorrectos).  
 *       500:  
 *         description: Error interno del servidor.  
 */
router.post('/transporte/ingreso-mt-reg/',async(req, res )=>{
  const  response  = await registrarIngresoMt(req.body);
  res.send(response);
})



export default router