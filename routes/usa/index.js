import  express  from "express";
import  {GetIdProductsUsa, updateStock} from "../../controllers/usa/index.js";
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.get(process.env.RUTA_GET_PRODUCTS_USA, async (req,res) => {
   const response  = await GetIdProductsUsa();    
    res.send(response); 
  });

router.put(process.env.RUTA_PUT_PRODUCT_ID, async (req,res) => {
    const response  = await updateStock(req.body);    
     res.send(response); 
   });  


export default router;