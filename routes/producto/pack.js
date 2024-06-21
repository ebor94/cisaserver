import  express  from "express";
import {GetPackingList} from "../../controllers/clientes/packing.js"
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.get(process.env.RUTA_GET_PACKING_LIST,  (req,res) => {
    const codsap = req.params.codsap;
    GetPackingList(codsap).then((response)=>{
    res.send(response); 
   });    
    
  });


  export default router;