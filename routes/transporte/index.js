import express from "express";
import {
  actions_Text_Save,
  GetListActions,
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

router.get(process.env.RUTA_GET_DETALLE_NOVDESP_XCODNOVDESP,async (req, res) => {
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

router.post(process.env.RUTA_ACTIONS_TEXT_SAVE, async (req, res) => {
  const response = await actions_Text_Save(req, res);
  res.send(response);
});

router.post(process.env.RUTA_ACTIONS_VALUE, async (req, res) => {
  const response = await Save_Actions_Value(req, res);
  res.send(response);
});

/**
 * @swagger
 * /transporte/grabarAccionFecha:
 *   post:
 *     summary: Accion Graba Fecha y Hora
 *     description: graba los datos de fecha y hora en las acciones segun sea el caso (eje. hora inicio alistamiento)
 *     tags:
 *       - Gestion Acciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codDestinatario:
 *                 type: string
 *                 example: A1
 *               codTipoDoc:
 *                 type: string
 *                 example: EN
 *               docNo:
 *                 type: string
 *                 example: 60618721
 *               fecha:
 *                 type: string
 *                 example: 2024-11-06
 *               hora:
 *                 type: string
 *                 example: 08:00
 *               accion:
 *                 type: string
 *                 example: "00003"
 *               usuario:
 *                 type: string
 *                 example: 9979
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
 *                   description: validacion exitosa 
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 data:
 *                    type: array
 *       400:
 *         description: Solicitud incorrecta (Bad Request)
 *       401:
 *         description: Autenticación fallida (Unauthorized)
 */
router.post(process.env.RUTA_ACTIONS_DATE, async (req, res) => {
  const response = await Save_Actions_Date(req.body);
  res.send(response);
});
router.post(process.env.RUTA_SAVE_ACTIONS_EMPLOYEE, async (req, res) => {
  const response = await Save_Actions_Employee(req.body);
  res.send(response);
});
router.post(process.env.RUTA_SAVE_ACTIONS_LIST_VALUE, async (req, res) => {
  const response = await Save_Actions_List_Value(req.body);
  res.send(response);
});
router.post(process.env.RUTA_ACTIONS_LIST_EVERY_VALUE, async (req, res) => {
  const response = await Save_Actions_List_every_Value(req.body);
  res.send(response);
});

/**
 * @swagger
 * /transporte/listaAcciones/:
 *   post:
 *     summary: Lista las acciones
 *     description: Lista las acciones segun los filtros
 *     tags:
 *       - Gestion Acciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codDestinatario:
 *                 type: string
 *                 example: A1
 *               codTipoDoc:
 *                 type: string
 *                 example: EN
 *               ordNo:
 *                 type: string
 *                 example: 60618721
 *               campoLibre4:
 *                 type: string
 *                 example: null
 *               campoLibre2:
 *                 type: string
 *                 example: null
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
 *                   description: validacion exitosa 
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 data:
 *                    type: array
 *       400:
 *         description: Solicitud incorrecta (Bad Request)
 *       401:
 *         description: Autenticación fallida (Unauthorized)
 */
router.post('/transporte/listaAcciones/', async (req, res) => {
  const response = await GetListActions(req.body);
  res.send(response);
});


export default router;
