import  express  from "express";
import  {GetIdProductsUsa} from "../../controllers/usa/index.js";
const router = express.Router();

router.get('/usa/productId', async (req,res) => {
   const response  = await GetIdProductsUsa();    
    res.send(response); 
  });


export default router;