import  express  from "express";
import dotenv from 'dotenv'
dotenv.config()
import {GetInventory} from "../../controllers/clientes/inventario.js"


const router = express.Router();

router.post(process.env.RUTA_GET_INVENTORY,  (req,res) => {
   GetInventory(req.body).then((response)=>{
    res.send(response); 
   });    
    
  });


  export default router;