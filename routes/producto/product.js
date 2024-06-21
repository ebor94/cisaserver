import { GetPorductPrice } from "../../controllers/producto/producto.js";
import  express  from "express";
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.post(process.env.RUTA_PRODUCT_PRICE,  (req,res) => {
    const data = req.body;
    GetPorductPrice(data).then((response)=>{
    res.send(response); 
   });    
    
  });


  export default router;