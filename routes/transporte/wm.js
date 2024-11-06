import  express  from "express";
import {Kpi_Alistamiento, listOtwithOrder, SessionWm, listLt22, Confirm_Ot, GetEntregaDetailWm} from '../../controllers/transporte/wm.js'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.post(process.env.RUTA_LOGINWM, async (req,res) => {
    const response  = await SessionWm(req.body);    
     res.send(response); 
   });


router.post(process.env.RUTA_KPI_ALISTAMIENTO,async(req, res )=>{
  const  response  = await Kpi_Alistamiento(req.body);
  res.send(response);
});

router.post(process.env.RUTA_OT_DETAIL_ORDER,async(req, res )=>{
  const  response  = await listOtwithOrder(req.body);
  res.send(response);
});


router.post(process.env.RUTA_LT22,async(req, res )=>{
  const  response  = await listLt22(req.body);
  res.send(response);
});

router.post(process.env.RUTA_CONFIRM_OT ,async(req, res )=>{
 
  const  response  = await Confirm_Ot(req.body);
  res.send(response);
});
/**
 * @swagger
 *
 * /transporte/detalleEntrega/{entrega}:
 *   get:
 *     summary: This API obtains the details of the deliveries and their status
 *     tags:
 *       - WM Alistamiento
 *     parameters:
 *       - in: path
 *         name: entrega    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: true
 *         description: delivery number
 *         example: "70335960"  # Cambiado value por example
 *     responses:
 *       200:
 *         description: Data employed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:     # Se agregó la definición de items para el array
 *                     type: object
 *                     properties:  # Aquí puedes definir las propiedades de los objetos en el array
 *                       # ejemplo:
 *                       # id:
 *                       #   type: string
 *                       # status:
 *                       #   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Delivery not found
 *       500:
 *         description: Internal server error
 */
router.get('/transporte/detalleEntrega/:entrega' ,async(req, res )=>{
 
  const  entrega = req.params.entrega;
  
  const  response  = await GetEntregaDetailWm(entrega);
  res.send(response);
});









export default router