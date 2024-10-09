import express  from "express";
import dotenv from 'dotenv'
import { GetEmpleado } from "../../controllers/corporativo/empleados.js";
dotenv.config()

const router = express.Router();

router.get(process.env.RUTA_GET_EMPLEADO, async(req,res)=>{
   const cc = req.params.cc; 
    const response  = await GetEmpleado(cc)
    res.send(response); 
});
export default router