import  express  from "express";
import {listaEntregasUsuario, regVehiculo} from '../../controllers/transporte/index.js'
//------------
import {getDespTransportador } from '../../controllers/transporte/index.js'
import {getInfoTransportador } from '../../controllers/transporte/index.js'
import {getValidarTransportador} from '../../controllers/transporte/index.js'
import {getInfoCliente_xEntrega} from '../../controllers/transporte/index.js'
import {getConsultar_documentoEntrega} from '../../controllers/transporte/index.js'
import {postGrabar_documentoEntrega} from '../../controllers/transporte/index.js'
import {getLista_TiposNovedadDespacho} from '../../controllers/transporte/index.js'
import {postGrabar_NovedadDespacho, postGrabar_ImagenNovedadDespacho } from '../../controllers/transporte/index.js'
import {postGrabar_LocalizacionDespacho } from '../../controllers/transporte/index.js'

import {getLista_NovedadDespacho_xDespacho } from '../../controllers/transporte/index.js'
import {getLista_NovedadDespachoDetalle_xDespacho } from '../../controllers/transporte/index.js'
import {getDetalleNovedad_xCodNovedad } from '../../controllers/transporte/index.js'


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

 //db app_despacho
 router.get(process.env.RUTA_GET_DOCUMENTO_XENTREGA, async (req,res) => {
  const {entrega} = req.params
  //console.log(cc)
  const response  = await getConsultar_documentoEntrega(entrega);    
  res.send(response); 
 });   

 //db app_despacho
 router.post(process.env.RUTA_POST_GRABAR_DOCUMENTO_ENTREGA, async (req,res) => {
  const {entrega, tipoDocumento, imgBase64, latitude, longitude, docConfirmado, usuario } = req.body;
  //const {entrega} = req.params
  //console.log(req.body)
  const response  = await postGrabar_documentoEntrega({entrega, tipoDocumento, imgBase64, latitude, longitude, docConfirmado, usuario });    
  //let response = 1
  res.send(response); 
 });   
 
 //db app_despacho
 router.get(process.env.RUTA_GET_LISTA_TIPOSNOVEDAD_DESPACHO, async (req,res) => {
  //const {entrega} = req.params
  //console.log(cc)
  const response  = await getLista_TiposNovedadDespacho();    
  res.send(response); 
 });   

 //db app_despacho
 router.post(process.env.RUTA_POST_GRABAR_NOVEDAD_DESPACHO, async (req,res) => {
  //const {despacho, TipoNovedadDesp, observacion, latitude, longitude, usuario } = req.body;
  //const {entrega} = req.params
  const response  =  await postGrabar_NovedadDespacho(req.body);    
  //let response = 1
  res.send(response); 
 }); 

 //db app_despacho
 router.post(process.env.RUTA_POST_GRABAR_IMAGENNOVEDAD_DESPACHO, async (req,res) => {
  //const {CodNovedadDesp, imgBase64, usuario } = req.body
  const response =  await postGrabar_ImagenNovedadDespacho(req.body);    
  //let response = 1
  res.send(response); 
 }); 

 //db app_despacho
 router.post(process.env.RUTA_POST_GRABAR_LOCALIZACION_DESPACHO, async (req,res) => {
  //const {CodNovedadDesp, imgBase64, usuario } = req.body
  const response =  await postGrabar_LocalizacionDespacho(req.body);    
  //let response = 1
  res.send(response); 
 }); 
 
 //---------------------
 //db app_despacho


 /**
 * @swagger
 * 
 * /transporte/lista_novedaddespacho/{despacho}:
 *   get:
 *     summary: Get data employed of synergy sending cc 
 *     tags:
 *       - APP Despacho # Categoría o sección donde aparecerá esta ruta
 *     parameters:
 *       - in: path
 *         despacho: despacho
 *         required: true
 *         value: '137899'
 *         description: numero de despacho
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data employed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cedula:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 success: 
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          CodSynergy: 
 *                              type: number    
 *                          NombreEmpleado: 
 *                              type: string    
 *                          CedulaEmpleado: 
 *                              type: string    
 *                          TelCorpEmpleado: 
 *                              type: number    
 *                          CelCorpEmpleado: 
 *                              type: string    
 *                          EmailCorpEmpleado: 
 *                              type: string    
 *                          Enfoque: 
 *                              type: string    
 *                          Cargo: 
 *                              type: string    
 *                          GrupoTrabajo: 
 *                              type: string    
 *                          Funcion: 
 *                              type: string    
 *                          Nivel: 
 *                              type: string    
 *                          JefeInmediato: 
 *                              type: string    
 */
router.get(process.env.RUTA_GET_LISTA_NOVDESP_XDESP, async (req,res) => {
  const {despacho} = req.params
  //console.log(cc)
  const response  = await getLista_NovedadDespacho_xDespacho(despacho);    
  //const response = despacho;
  res.send(response); 
 });   
 
 router.get(process.env.RUTA_GET_LISTA_NOVDESPDET_XDESP, async (req,res) => {
  const {despacho} = req.params
  //console.log(cc)
  const response  = await getLista_NovedadDespachoDetalle_xDespacho(despacho);    
  //const response = despacho;
  res.send(response); 
 });   
 
 router.get(process.env.RUTA_GET_DETALLE_NOVDESP_XCODNOVDESP, async (req,res) => {
  const {codnovdespacho} = req.params
  //console.log(cc)
  const response  = await getDetalleNovedad_xCodNovedad(codnovdespacho);    
  //const response = despacho;
  res.send(response); 
 }); 

 
 
 

export default router