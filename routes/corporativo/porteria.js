import express  from "express";
import { getFlujo } from "../../controllers/corporativo/porteria.js";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.get(process.env.RUTA_GET_ID_FLUJO, async(req,res)=>{
   const id = req.params.id;
 
    const response  = await getFlujo(id)
    res.send(response); 
});
export default router