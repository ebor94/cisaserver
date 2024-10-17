import express  from "express";
import { getFlujo , getInfoPlacaEmpl} from "../../controllers/corporativo/porteria.js";
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
 *     summary: Get data employed of synergy sending cc 
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
 *     responses:
 *       200:
 *         description: Data employed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cedula:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 success: 
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          CodSynergy: 
 *                              type: number    
 *                          NombreEmpleado: 
 *                              type: string    
 *                          CedulaEmpleado: 
 *                              type: string    
 *                          TelCorpEmpleado: 
 *                              type: number    
 *                          CelCorpEmpleado: 
 *                              type: string    
 *                          EmailCorpEmpleado: 
 *                              type: string    
 *                          Enfoque: 
 *                              type: string    
 *                          Cargo: 
 *                              type: string    
 *                          GrupoTrabajo: 
 *                              type: string    
 *                          Funcion: 
 *                              type: string    
 *                          Nivel: 
 *                              type: string    
 *                          JefeInmediato: 
 *                              type: string    
 */
router.get(process.env.RUTA_GET_INFO_PLACA, async(req,res)=>{
    const placa = req.params.placa;
  
     const response  = await getInfoPlacaEmpl(placa)
     res.send(response); 
 });
export default router