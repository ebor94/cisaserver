import  express  from "express";
import  {HorarioListarSalas,HorarioRegistrarTurno,Horariomostrardisponible} from "../../controllers/institucional/index.js";
const router = express.Router();

router.post('/listarSalas', async (req,res) => {
   const response  = await HorarioListarSalas(req.body.bandera);    
    res.send(response); 
  });

router.post('/listarHorarios/', async  (req, res)=>{
  const response  = await  Horariomostrardisponible(req.body);    
    res.send(response); 
 
  
    
})

router.post('/RegistrarTurno/', async  (req, res)=>{
  console.log("route")
  const response  = await  HorarioRegistrarTurno(req.body);    
  res.send(response); 
    
})

export default router;