import  express  from "express";
import {regVehiculo} from '../../controllers/transporte/index.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post(process.env.RUTA_REGISTRAR_VEHICULO, async (req,res) => {
    const response  = await regVehiculo(req.body);    
     res.send(response); 
   });


   export default router