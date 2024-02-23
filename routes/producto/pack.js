import  express  from "express";
import {GetPackingList} from "../../controllers/clientes/packing.js"


const router = express.Router();

router.get('/producto/pack/:codsap',  (req,res) => {
    const codsap = req.params.codsap;
    GetPackingList(codsap).then((response)=>{
    res.send(response); 
   });    
    
  });


  export default router;