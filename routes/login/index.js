import  express  from "express";
import dotenv from 'dotenv'
dotenv.config()

import  {LoginSap,LoginDomain, logsLogin, GetZcisaparmetros} from "../../controllers/login/index.js";
const router = express.Router();

router.post(process.env.RUTA_LOGIN_SAP , async (req,res) => {
   const response  = await LoginSap(req.body);    
    res.send(response); 
  });

router.post(process.env.RUTA_LOGIN_AD, async  (req, res)=>{
   await  LoginDomain(req, res);
  //console.log(response)    
  //  res.send(response); 
 
})

router.post(process.env.RUTA_LOG_LOGIN, async(req, res)=>{
  const response  = await logsLogin(req, res)
    res.send(response);
})

router.post(process.env.RUTA_CISAPARMETROS , async(req, res)=>{
  const response  = await GetZcisaparmetros(req, res)
    res.send(response);
})




export default router;