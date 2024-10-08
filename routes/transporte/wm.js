import  express  from "express";
import {Kpi_Alistamiento, listOtwithOrder, SessionWm, listLt22, Confirm_Ot} from '../../controllers/transporte/wm.js'
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









export default router