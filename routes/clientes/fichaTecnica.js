import express  from "express";
import { GetFichaTecnica, getDataSheetSap} from "../../controllers/clientes/fichaTecnica.js";


const router = express.Router();

router.get('/clientes/ft/:codsap', async(req,res)=>{
    
   const codsap = req.params.codsap;
   //console.log(codsap)
    const response  = await GetFichaTecnica(codsap)
    res.send(response); 
});


router.get('/clientes/ftsap/:codsap', async(req,res)=>{
    
    const codsap = req.params.codsap;
    //console.log(codsap)
     const response  = await getDataSheetSap(codsap)
     res.send(response); 
 });




export default router