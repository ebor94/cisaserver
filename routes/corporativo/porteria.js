import express  from "express";
import {validarRutaUsuario} from "../../midleware/validaRuta.js"
import { getFlujo , getInfoPlacaEmpl, RecordPlateObservation} from "../../controllers/corporativo/porteria.js";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.get(process.env.RUTA_GET_ID_FLUJO, async(req,res)=>{
   const id = req.params.id;
 
    const response  = await getFlujo(id)
    res.send(response); 
});
/**
 * @swagger
 * 
 * /corporativo/porteria/vehiculo/{placa}:
 *   get:
 *     summary: This API returns vehicle information based on its license plate, in accordance with the road liability policy.  
 *     tags:
 *       - Corporativo # Categoría o sección donde aparecerá esta ruta
 *     parameters:
 *       - in: path
 *         name: placa
 *         required: true
 *         value: 'KEX-370'
 *         description: Placa del vehiculo
 *         schema:
 *           type: string
 *       - in: header
 *         name: user-id
 *         required: true
 *         description: ID del usuario autenticado
 *         schema:
 *           type: string
 *       - in: header
 *         name: app
 *         required: true
 *         description: Aplicacion a validar
 *         schema:
 *           type: string
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
 *                   items:
 *                      type: object
 *                      properties:
 *                          fullname: 
 *                              type: string    
 *                          task: 
 *                              type: string    
 *                          Picture: 
 *                              type: object  
 *                              propieties:
 *                                  type:
 *                                     type: "Buffer"
 *                                  data:
 *                                     type: array
 *                          placa: 
 *                              type: string    
 *                          tipovehiculo: 
 *                              type: string    
 *                          nacionalidad: 
 *                              type: string    
 *                          MSGVencimientoSOAT: 
 *                              type: string    
 *                          MSGVencimientotecnicomecanica: 
 *                              type: string    
 *                          MSGVencimientolicencia: 
 *                              type: string    
 *                          falla: 
 *                              type: string   
 */
router.get(process.env.RUTA_GET_INFO_PLACA, validarRutaUsuario,async(req,res)=>{
    const placa = req.params.placa;  
    const response  = await getInfoPlacaEmpl(placa)
     res.send(response); 
 });

/**
 * @swagger
 *
 * /corporativo/porteria/vehiculo/novedad:
 *   post:
 *     summary: register observation of a vehicle.  
 *     tags:
 *       - Corporativo
 *     parameters:
 *       - in: header
 *         name: user-id
 *         required: true
 *         description: ID del usuario autenticado
 *         schema:
 *           type: string
 *       - in: header
 *         name: app
 *         required: true
 *         description: Aplicacion a validar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placa:
 *                 type: string
 *                 example: GAZ70W
 *               novedad:
 *                 type: string
 *                 example: "Vehiculo dejó luces encendidas"
 *     responses:
 *       200:
 *         description: succes observation
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
 *                       mensaje:
 *                         type: string    
 */
 router.post(process.env.RUTA_SAVE_NOVEDAD_PLACA, validarRutaUsuario,async(req,res)=>{
    let placa = req.body.placa;
    let novedad = req.body.novedad;
    let userId = req.headers['user-id']
    const response  = await RecordPlateObservation(placa, novedad,userId)
     res.send(response); 
 });
export default router