import express  from "express";
import dotenv from 'dotenv'
import { GetEmpleado } from "../../controllers/corporativo/empleados.js";
dotenv.config()

const router = express.Router();

/**
 * @swagger
 * 
 * /corporativo/empleado/{cedula}:
 *   get:
 *     summary: Get data employed of synergy sending cc 
 *     tags:
 *       - Corporativo # Categoría o sección donde aparecerá esta ruta
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         value: '1093771589'
 *         description: Cc employed
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
router.get(process.env.RUTA_GET_EMPLEADO, async(req,res)=>{
   const cc = req.params.cc; 
    const response  = await GetEmpleado(cc)
    res.send(response); 
});
export default router