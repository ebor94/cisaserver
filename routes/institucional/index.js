import  express  from "express";
import  {HorarioListarSalas,HorarioRegistrarTurno,Horariomostrardisponible} from "../../controllers/institucional/index.js";
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

router.post(process.env.RUTA_LISTAR_SALAS, async (req,res) => {
   const response  = await HorarioListarSalas(req.body.bandera);    
    res.send(response); 
  });

router.post(process.env.RUTA_LISTAR_HORARIOS , async  (req, res)=>{
  const response  = await  Horariomostrardisponible(req.body);    
    res.send(response); 
 

})

router.post(process.env.RUTA_REGISTRA_TURNOS , async  (req, res)=>{

  const response  = await  HorarioRegistrarTurno(req.body);    
  res.send(response); 
    
})

export default router;