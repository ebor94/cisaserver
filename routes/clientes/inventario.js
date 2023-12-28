import  express  from "express";
import {GetInventory} from "../../controllers/clientes/inventario.js"


const router = express.Router();

router.post('/clientes/inventario',  (req,res) => {
   GetInventory(req.body).then((response)=>{
    res.send(response); 
   });    
    
  });


  export default router;