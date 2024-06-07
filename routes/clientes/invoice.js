import express  from "express";
import { GetInvoiceController, GetQuoteHead, PostOrderReference} from "../../controllers/clientes/invoice.js";


const router = express.Router();

router.post('/clientes/invoice/', async(req,res)=>{    
   const data = req.body;
   //console.log(codsap)
    const response  = await GetInvoiceController(data)
    res.send(response); 
});


router.post('/clientes/quote/', async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await GetQuoteHead(data)
     res.send(response); 
 });

 router.post('/clientes/order/', async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await PostOrderReference(data)
     res.send(response); 
 });









export default router