import express  from "express";
import dotenv from 'dotenv'
dotenv.config()
import { GetDataSheetDrive, GetFichaTecnica, getDataSheetSap} from "../../controllers/clientes/fichaTecnica.js";



const router = express.Router();

router.get(process.env.RUTA_GET_FICHA_TECNICA , async(req,res)=>{
    
   const codsap = req.params.codsap;
   //console.log(codsap)
    const response  = await GetFichaTecnica(codsap)
    res.send(response); 
});


router.get(process.env.RUTA_GET_FICHA_TECNICA_SAP , async(req,res)=>{
    
    const codsap = req.params.codsap;
    let lang = req.params.lang;
    if(typeof lang == undefined){
        lang = 'S'
    }
    //console.log(codsap)
     const response  = await getDataSheetSap(codsap, lang)
     res.send(response); 
 });

 router.get(process.env.RUTA_GET_FICHA_DRIVE, async(req,res)=>{
    
    const codsap = req.params.busqueda;
     // console.log(codsap)
     const response  = await GetDataSheetDrive(codsap)
     res.send(response); 
 });




export default router