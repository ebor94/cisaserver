import express  from "express";
import { GetInvoiceController} from "../../controllers/clientes/invoice.js";


const router = express.Router();

router.post('/clientes/invoice/', async(req,res)=>{    
   const data = req.body;
   //console.log(codsap)
    const response  = await GetInvoiceController(data)
    res.send(response); 
});






export default router