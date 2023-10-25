import  express  from "express";
import  {GetIdProductsUsa, updateStock} from "../../controllers/usa/index.js";
const router = express.Router();

router.get('/usa/productId', async (req,res) => {
   const response  = await GetIdProductsUsa();    
    res.send(response); 
  });

router.put('/usa/PutProductId', async (req,res) => {
    const response  = await updateStock(req.body);    
     res.send(response); 
   });  


export default router;