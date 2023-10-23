import  express  from "express";
import  {GetProductsUsa} from "../../controllers/usa/index.js";
const router = express.Router();

router.post('/usa/productList', async (req,res) => {
   const response  = await GetProductsUsa();    
    res.send(response); 
  });




export default router;