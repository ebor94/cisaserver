import  express  from "express";
import {GetInventory} from "../../controllers/clientes/inventario.js"


const router = express.Router();

router.post('/clientes/inventario', async (req,res) => {
   const response  = await GetInventory(req.body);    
    res.send(response); 
  });


  export default router;