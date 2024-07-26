import  express  from "express";
import {Kpi_Alistamiento, SessionWm} from '../../controllers/transporte/wm.js'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.post(process.env.RUTA_LOGINWM, async (req,res) => {
    const response  = await SessionWm(req.body);    
     res.send(response); 
   });


   export default router


router.post(process.env.RUTA_KPI_ALISTAMIENTO,async(req, res )=>{
  const  response  = await Kpi_Alistamiento(req.body);
  res.send(response);
});