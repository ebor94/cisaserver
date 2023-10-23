import  express  from "express";
import  {LoginSap,LoginDomain} from "../../controllers/login/index.js";
const router = express.Router();

router.post('/LoginSap', async (req,res) => {
   const response  = await LoginSap(req.body);    
    res.send(response); 
  });

router.post('/LoginDomain/', async  (req, res)=>{
  const response  = await  LoginDomain(req.body);    
    res.send(response); 
 
  
    
})



export default router;