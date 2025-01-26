import  express  from "express";
import {sendMessage, sendMessageChatGoogle, SendSms} from "../../controllers/mensajeria/mensajeria.js"
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

  router.post(process.env.RUTA_MENSAJERIA_GOOLGE, (req,res)=>{
   const data = req.body;   
   sendMessageChatGoogle(data).then((response)=>{

     res.send(response);
   });
  });
/**
 * @swagger
 * /mensajeria/sms/:
 *   post:
 *     summary: envio sms
 *     description: envio sms
 *     tags:
 *       - Mesajeria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [numero sms]
 *             properties:
 *               numero:
 *                 type: string
 *                 example: "3165217418"
 *               sms:
 *                 type: string
 *                 example: "prueba sms"
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo del resultado
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Array con los datos de respuesta
 *       400:
 *         description: Solicitud incorrecta (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       401:
 *         description: Autenticación fallida (Unauthorized)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
  router.post('/mensajeria/sms/', (req,res)=>{
    const data = req.body;   
    SendSms(data).then((response)=>{ 
      res.send(response);
    });
   });
  


  export default router;