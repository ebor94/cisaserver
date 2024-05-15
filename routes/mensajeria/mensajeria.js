import  express  from "express";
import {sendMessage} from "../../controllers/mensajeria/mensajeria.js"


const router = express.Router();

router.post('/mensajeria/',  (req,res) => {
    const data = req.body;
    console.log(data)
    sendMessage(data).then((response)=>{
     console.log(response)   
    res.send(response); 
   });    
    
  });


  export default router;