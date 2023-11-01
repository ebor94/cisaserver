import  express  from "express";
import {regVehiculo} from '../../controllers/transporte/index.js'

const router = express.Router();

router.post('/transporte/regVehiculo', async (req,res) => {
    const response  = await regVehiculo(req.body);    
     res.send(response); 
   });