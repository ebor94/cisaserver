import  express  from "express";
import {listaEntregasUsuario, regVehiculo} from '../../controllers/transporte/index.js'
//------------
import {getDespTransportador } from '../../controllers/transporte/index.js'
import {getInfoTransportador } from '../../controllers/transporte/index.js'
import {getValidarTransportador} from '../../controllers/transporte/index.js'
import {getInfoCliente_xEntrega} from '../../controllers/transporte/index.js'
import {getConsultar_documentoEntrega} from '../../controllers/transporte/index.js'

//---
import dotenv from 'dotenv'
dotenv.config()
//---
const router = express.Router();
//---------------------------------------------------------------------------
router.post(process.env.RUTA_REGISTRAR_VEHICULO, async (req,res) => {
    const response  = await regVehiculo(req.body);    
     res.send(response); 
   });

router.post(process.env.RUTA_LISTA_ENTREGAS_ALISTAMIENTO, async (req,res) => {
    const response  = await listaEntregasUsuario(req.body);    
     res.send(response); 
   });   

//------------------------------------------------------------------------------------------------------------------
// Funciones usadas en app_despacho
//------------------------------------------------------------------------------------------------------------------

/*
router.get(process.env.RUTA_GET_ID_FLUJO, async(req,res)=>{
  const id = req.params.id;

   const response  = await getFlujo(id)
   res.send(response); 
});
//router.get('/desp_transportador/:cc', getDespTransportador); //Consultar un despacho con sus entregas por cc de transportador por cc   
*/
router.get(process.env.RUTA_GET_DESPACHO_XCC, async (req,res) => {
  const cc = req.params.cc
  //console.log(cc)
  const response  = await getDespTransportador(cc);    
   res.send(response); 
 });   

 
 router.get(process.env.RUTA_GET_INFOTRANSPORTADOR_XCC, async (req,res) => {
  const cc = req.params.cc
  //console.log(cc)
  const response  = await getInfoTransportador(cc);    
  res.send(response); 
 });   

 router.get(process.env.RUTA_GET_VALIDARTRANSPORTADOR, async (req,res) => {
  const {cc,tel,placa} = req.params
  //console.log(cc)
  const response  = await getValidarTransportador(cc,tel,placa);    
  res.send(response); 
 });   

 router.get(process.env.RUTA_GET_CLIENTE_XENTREGA, async (req,res) => {
  const {entrega} = req.params
  //console.log(cc)
  const response  = await getInfoCliente_xEntrega(entrega);    
  res.send(response); 
 });   

 router.get(process.env.RUTA_GET_DOCUMENT_XENTREGA, async (req,res) => {
  const {entrega} = req.params
  //console.log(cc)
  const response  = await getConsultar_documentoEntrega(entrega);    
  res.send(response); 
 });   

 

 

 
export default router