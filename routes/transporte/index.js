import express from "express";
import {
  actions_Text_Save,
  listaEntregasUsuario,
  regVehiculo,
  Save_Actions_Date,
  Save_Actions_Employee,
  Save_Actions_List_every_Value,
  Save_Actions_List_Value,
  Save_Actions_Value,
} from "../../controllers/transporte/index.js";

import { getLista_NovedadDespacho_xDespacho , getLista_NovedadDespachoDetalle_xDespacho , getDetalleNovedad_xCodNovedad,
         postGrabar_LocalizacionDespacho , postGrabar_NovedadDespacho,  postGrabar_ImagenNovedadDespacho, getConsultar_fechaServer,
          putActualizar_EstadoEntrega, getDespTransportador, getInfoTransportador , getLista_TiposNovedadDespacho ,getValidarTransportador
          ,getInfoCliente_xEntrega, getConsultar_documentoEntrega, postGrabar_documentoEntrega} from "../../controllers/transporte/index.js";


import dotenv from "dotenv";
dotenv.config();
//---
const router = express.Router();
//---------------------------------------------------------------------------
router.post(process.env.RUTA_REGISTRAR_VEHICULO, async (req, res) => {
  const response = await regVehiculo(req.body);
  res.send(response);
});

router.post(process.env.RUTA_LISTA_ENTREGAS_ALISTAMIENTO, async (req, res) => {
  const response = await listaEntregasUsuario(req.body);
  res.send(response);
});

router.get(process.env.RUTA_GET_DESPACHO_XCC, async (req, res) => {
  const cc = req.params.cc;
  const response = await getDespTransportador(cc);
  res.send(response);
});

router.get(process.env.RUTA_GET_INFOTRANSPORTADOR_XCC, async (req, res) => {
  const cc = req.params.cc;
  const response = await getInfoTransportador(cc);
  res.send(response);
});

router.get(process.env.RUTA_GET_VALIDARTRANSPORTADOR, async (req, res) => {
  const { cc, tel, placa } = req.params;
  const response = await getValidarTransportador(cc, tel, placa);
  res.send(response);
});

router.get(process.env.RUTA_GET_CLIENTE_XENTREGA, async (req, res) => {
  const { entrega } = req.params;
  const response = await getInfoCliente_xEntrega(entrega);
  res.send(response);
});

router.get(process.env.RUTA_GET_DOCUMENTO_XENTREGA, async (req, res) => {
  const { entrega } = req.params;
  const response = await getConsultar_documentoEntrega(entrega);
  res.send(response);
});

router.post(
  process.env.RUTA_POST_GRABAR_DOCUMENTO_ENTREGA,
  async (req, res) => {
    const {entrega,tipoDocumento,imgBase64,latitude,longitude,docConfirmado,usuario} = req.body;
    const response = await postGrabar_documentoEntrega({entrega,tipoDocumento,imgBase64,latitude,longitude,docConfirmado,usuario});
    res.send(response);
  }
);

router.get(
  process.env.RUTA_GET_LISTA_TIPOSNOVEDAD_DESPACHO,
  async (req, res) => {
    const response = await getLista_TiposNovedadDespacho();
    res.send(response);
  }
);

router.post(process.env.RUTA_POST_GRABAR_NOVEDAD_DESPACHO, async (req, res) => {
  const response = await postGrabar_NovedadDespacho(req.body);
  res.send(response);
});

router.post(
  process.env.RUTA_POST_GRABAR_IMAGENNOVEDAD_DESPACHO,
  async (req, res) => {
    const response = await postGrabar_ImagenNovedadDespacho(req.body);
    res.send(response);
  }
);

router.post(
  process.env.RUTA_POST_GRABAR_LOCALIZACION_DESPACHO,
  async (req, res) => {
    const response = await postGrabar_LocalizacionDespacho(req.body);
    res.send(response);
  }
);

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
router.get(process.env.RUTA_GET_LISTA_NOVDESP_XDESP, async (req, res) => {
  const { despacho } = req.params;
  const response = await getLista_NovedadDespacho_xDespacho(despacho);
  res.send(response);
});

router.get(process.env.RUTA_GET_LISTA_NOVDESPDET_XDESP, async (req, res) => {
  const { despacho } = req.params;
  const response = await getLista_NovedadDespachoDetalle_xDespacho(despacho);
  res.send(response);
});

router.get(
  process.env.RUTA_GET_DETALLE_NOVDESP_XCODNOVDESP,
  async (req, res) => {
    const { codnovdespacho } = req.params;
    const response = await getDetalleNovedad_xCodNovedad(codnovdespacho);
    res.send(response);
  }
);

router.get(process.env.RUTA_GET_FECHASERV, async (req, res) => {
  const { formato_fecha } = req.params;
  const response = await getConsultar_fechaServer(formato_fecha);
  res.send(response);
});

router.put(process.env.RUTA_PUT_ACTUALIZAR_ENTREGA, async (req, res) => {
  console.log(req.body);
  const response = await putActualizar_EstadoEntrega(req.body);
  res.send(response);
});

router.post(process.env.RUTA_HORA_INICIO_ALISTAMIENTO, async (req, res) => {
  const response = await actions_Text_Save(req, res);
  res.send(response);
});

router.post(process.env.RUTA_HORA_FIN_ALISTAMIENTO, async (req, res) => {
  const response = await Save_Actions_Value(req, res);
  res.send(response);
});

router.post(process.env.RUTA_HORA_FIN_ALISTAMIENTO, async (req, res) => {
  const response = await Save_Actions_Date(req, res);
  res.send(response);
});
router.post(process.env.RUTA_HORA_FIN_ALISTAMIENTO, async (req, res) => {
  const response = await Save_Actions_Employee(req, res);
  res.send(response);
});
router.post(process.env.RUTA_HORA_FIN_ALISTAMIENTO, async (req, res) => {
  const response = await Save_Actions_List_Value(req, res);
  res.send(response);
});
router.post(process.env.RUTA_HORA_FIN_ALISTAMIENTO, async (req, res) => {
  const response = await Save_Actions_List_every_Value(req, res);
  res.send(response);
});



export default router;
