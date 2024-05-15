import  express  from "express";
import {sendMessage} from "../../controllers/mensajeria/mensajeria.js"


const router = express.Router();

router.post('/mensajeria/',  (req,res) => {
    const data = req.body;
    sendMessage(data).then((response)=>{
    res.send(response); 
   });    
    
  });


  export default router;