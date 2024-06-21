import express  from "express";
import { GetInvoiceController, GetQuoteHead, PostOrderReference} from "../../controllers/clientes/invoice.js";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post(process.env.RUTA_INVOICE , async(req,res)=>{    
   const data = req.body;
   //console.log(codsap)
    const response  = await GetInvoiceController(data)
    res.send(response); 
});


router.post(process.env.RUTA_HEAD_QUOTE, async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await GetQuoteHead(data)
     res.send(response); 
 });

 router.post(process.env.RUTA_ORDER_REFERENCE, async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await PostOrderReference(data)
     res.send(response); 
 });









export default router