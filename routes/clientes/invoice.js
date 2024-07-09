import express  from "express";
import { GetInvoiceController, GetQuoteHead, PostOrderReference ,
    CreateConsecutiveController,
    CreateDetailController,
    GetDetailController,
    DelPosDetailController,
    FinishSalesController,
    GetCentroCiudadController} from "../../controllers/clientes/invoice.js";
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
     const response  = await GetQuoteHead(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_ORDER_REFERENCE, async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await PostOrderReference(data);
     res.send(response); 
 });



 /** rutas proceso para pedidos */

 router.post(process.env.RUTA_CONSECUTIVE , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await CreateConsecutiveController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_CREATE_DETAIL , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await CreateDetailController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_DEL_DETAIL , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await DelPosDetailController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_FINISH_SALE , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await FinishSalesController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_GET_DETAIL , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await GetDetailController(data);
     res.send(response); 
 });

 router.post(process.env.RUTA_INFO_CIUDAD , async(req,res)=>{    
    const data = req.body;
    //console.log(codsap)
     const response  = await GetCentroCiudadController(data);
     res.send(response); 
 });









export default router