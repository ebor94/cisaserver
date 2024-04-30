import  express  from "express";
import {SessionWm} from '../../controllers/transporte/wm.js'

const router = express.Router();

router.post('/transporte/sesionwm', async (req,res) => {
    const response  = await SessionWm(req.body);    
     res.send(response); 
   });


   export default router