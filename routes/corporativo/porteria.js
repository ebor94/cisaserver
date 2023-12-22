import express  from "express";
import { getFlujo } from "../../controllers/corporativo/porteria.js";

const router = express.Router();

router.get('/corporativo/porteria/:id', async(req,res)=>{
   const id = req.params.id;
 
    const response  = await getFlujo(id)
    res.send(response); 
});
export default router