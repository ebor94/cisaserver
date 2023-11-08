import express  from "express";
import { getFlujo } from "../../controllers/corporativo/porteria.js";

const router = express.Router();

router.get('/corporativo/porteria/:id/:tipo', async(req,res)=>{
   const id = req.params.id;
   const tipo = req.params.tipo;
    const response  = await getFlujo(id, tipo)
    res.send(response); 
});
export default router