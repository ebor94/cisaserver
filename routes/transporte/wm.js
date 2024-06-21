import  express  from "express";
import {SessionWm} from '../../controllers/transporte/wm.js'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.post(process.env.RUTA_LOGINWM, async (req,res) => {
    const response  = await SessionWm(req.body);    
     res.send(response); 
   });


   export default router