import { GetPorductPrice } from "../../controllers/producto/producto.js";
import  express  from "express";

const router = express.Router();

router.post('/producto/price/',  (req,res) => {
    const data = req.body;
    GetPorductPrice(data).then((response)=>{
    res.send(response); 
   });    
    
  });


  export default router;