import express from "express";
import {
  actions_Text_Save,
  ContabilizarEntrega,
  GetIndicadorDespacho,
  GetListActions,
  grabarPesoBascula,
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
          ,getInfoCliente_xEntrega,getInfoTransportador_xEntrega, getConsultar_documentoEntrega, postGrabar_documentoEntrega} from "../../controllers/transporte/index.js";


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


/**
 * @swagger
 *
 * /transporte/info_transportador_xentrega/{entrega}: 
 *   get:
 *     summary: información de transportador por numero de entrega
 *     tags:
 *       - APP Despacho # Categoría o sección donde aparecerá esta ruta
 *     parameters:
 *       - in: path
 *         name: entrega
 *         required: true
 *         value: '60639162'
 *         description: numero de entrega
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de transportador por entrega
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transportadora:
 *                   type: string
 *                   example: "TRANSMULTIMAC LTDA"
 *                 DesTipoVehiculo:
 *                   type: string
 *                   example: "TURBO"
 *                 Transportador:
 *                   type: string
 *                   example: "JEYSON CONTRERAS"
 *                 cedula:
 *                   type: string
 *                   example: "1093413203" 
 *                 placa:
 *                   type: string
 *                   example: "XMD863" 
 *                 No_celular:
 *                   type: string
 *                   example: "3104843155" 
 *                 entrega:
 *                   type: string
 *                   example: "60639162"
 *                 despacho:
 *                   type: string
 *                   example: "00141053"  
 */
router.get(process.env.RUTA_GET_TRANSPORTADOR_XENTREGA, async (req, res) => {
  const { entrega } = req.params;
  const response = await getInfoTransportador_xEntrega(entrega);
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
 *     summary: lista de novedades de un despacho
 *     tags:
 *       - APP Despacho # Categoría o sección donde aparecerá esta ruta
 *     parameters:
 *       - in: path
 *         name: despacho
 *         required: true
 *         value: '137899'
 *         description: numero de despacho
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de novedades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codNovedadDesp:
 *                   type: number
 *                   example: 53
 *                 Despacho:
 *                   type: string
 *                   example: "137899"
 *                 Entrega:
 *                   type: string
 *                   example: "60616967" 
 *                 observacion:
 *                   type: string
 *                   example: "observación..." 
 *                 fechaActualizacion:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-22T10:46:24.893Z" 
 *                 CodTipoNovedadDesp:
 *                   type: number
 *                   example: 1
 *                 DesTipoNovedadDesp:
 *                   type: string
 *                   example: "PROBLEMA MECANICO"  
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
/**
 * @swagger
 * /transporte/grabarAccionTexto:
 *   post:
 *     summary: Accion Grabar tipo texto 
 *     description: graba los datos de texto en las acciones segun sea el caso (eje. novedades de la entrega)
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
 *               texto:
 *                 type: string
 *                 example: prueba de novedad de una entrega
 *               accion:
 *                 type: string
 *                 example: "00160"
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
router.post(process.env.RUTA_ACTIONS_TEXT_SAVE, async (req, res) => {
  const response = await actions_Text_Save(req.body);
  res.send(response);
});

router.post(process.env.RUTA_ACTIONS_VALUE, async (req, res) => {
  const response = await Save_Actions_Value(req.body);
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

/**
 * @swagger
 *
 * /transporte/contab-entrega/{entrega}/{bandera}:
 *   get:
 *     summary: This API assess order
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
  *       - in: path
 *         name: bandera    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: false
 *         description: flag for validate picking send X
 *         example: "x"  # Cambiado value por example
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
router.get('/transporte/contab-entrega/:entrega/:bandera/', async (req, res) => {
  const { entrega , bandera} = req.params;
  const response = await ContabilizarEntrega(entrega , bandera);
  res.send(response);
});

/**
 * @swagger
 * /transporte/indicadorDespacho/{ptoExp}:
 *   get:
 *     summary: extreae el indicador de despacho
 *     description: extrae el indicador de despacho segun el puesto de expedicion
 *     tags:
 *       - Gestion Acciones
  *     parameters:
 *       - in: path
 *         name: ptoExp    # Se agregó el campo name que es requerido
 *         schema:
 *           type: string
 *         required: true
 *         description: puesto de expedicion
 *         example: "1100"  # Cambiado value por example
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
router.get('/transporte/indicadorDespacho/:ptoExp/', async (req, res) => {
  const { ptoExp } = req.params;
  const response = await GetIndicadorDespacho(ptoExp);
  res.send(response);
});

/**
 * @swagger
 * /transporte/grabaPeso/:
 *   post:
 *     summary: Guarda el peso en la báscula.
 *     description: Este endpoint recibe el nombre de la máquina, el peso y el contador, y guarda los datos en la base de datos.
 *     tags:
 *       - Báscula
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreMaquina:
 *                 type: string
 *                 description: Nombre de la máquina.
 *                 example: "Máquina1"
 *               peso:
 *                 type: number
 *                 format: float
 *                 description: Peso registrado.
 *                 example: 100.5
 *               contador:
 *                 type: integer
 *                 description: Contador de la máquina.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Peso guardado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombreMaquina:
 *                         type: string
 *                         example: "Máquina1"
 *                       peso:
 *                         type: number
 *                         format: float
 *                         example: 100.5
 *                       contador:
 *                         type: integer
 *                         example: 1
 *                 message:
 *                   type: string
 *                   example: "Operación exitosa"
 *       500:
 *         description: Error al procesar la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Error al procesar la solicitud"
 */
router.post('/transporte/grabaPeso/', async (req, res) => {
  const { nombreMaquina, peso, contador } = req.body;
  const response = await grabarPesoBascula(nombreMaquina, peso, contador);
  res.json(response);
});

export default router;
