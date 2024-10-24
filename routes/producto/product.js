import { GetPorductPrice, GetRoturaController, GetSamples } from "../../controllers/producto/producto.js";
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


  router.post(process.env.RUTA_PRODUCT_SAMPLE,  (req,res) => {
    const data = req.body;
    GetSamples(data).then((response)=>{
    res.send(response); 
   });    
    
  });

  router.get(process.env.RUTA_GET_ROTURA,(req,res)=>{
    let centro = req.params.centro;
    let mov1 = req.params.mov1;
    let mov2 = req.params.mov2;
    let fechaini = req.params.fechaini;
    let fechafin = req.params.fechafin;

   GetRoturaController(centro,mov1,mov2,fechaini,fechafin).then((response)=>{
    res.send(response);
   }
  )

  })


  export default router;