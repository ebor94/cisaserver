import  express  from "express";
import {sendMessage} from "../../controllers/mensajeria/mensajeria.js"
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post(process.env.RUTA_MENSAJERIA ,  (req,res) => {
    const data = req.body;
    console.log(data)
    sendMessage(data).then((response)=>{
     console.log(response)   
    res.send(response); 
   });    
    
  });


  export default router;