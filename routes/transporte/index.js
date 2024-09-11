import  express  from "express";
import {listaEntregasUsuario, regVehiculo} from '../../controllers/transporte/index.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post(process.env.RUTA_REGISTRAR_VEHICULO, async (req,res) => {
    const response  = await regVehiculo(req.body);    
     res.send(response); 
   });

router.post(process.env.RUTA_LISTA_ENTREGAS_ALISTAMIENTO, async (req,res) => {
    const response  = await listaEntregasUsuario(req.body);    
     res.send(response); 
   });   





   export default router