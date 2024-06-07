import  express  from "express";
import  {LoginSap,LoginDomain, logsLogin, GetZcisaparmetros} from "../../controllers/login/index.js";
const router = express.Router();

router.post('/LoginSap', async (req,res) => {
   const response  = await LoginSap(req.body);    
    res.send(response); 
  });

router.post('/loginAd/', async  (req, res)=>{
   await  LoginDomain(req, res);
  //console.log(response)    
  //  res.send(response); 
 
})

router.post('/logLogin/', async(req, res)=>{
  const response  = await logsLogin(req, res)
    res.send(response);
})

router.post('/zcisaparmetros/', async(req, res)=>{
  const response  = await GetZcisaparmetros(req, res)
    res.send(response);
})




export default router;