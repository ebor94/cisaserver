import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import os from "os";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
dotenv.config();

import listarSalas from "./routes/institucional/index.js";
import listarHorarios from "./routes/institucional/index.js";
import RegistrarTurno from "./routes/institucional/index.js";
import LoginSap from "./routes/login/index.js";
import loginAd from "./routes/login/index.js";
import GetZcisaparmetros from "./routes/login/index.js";
import GetProductsUsa from "./routes/usa/index.js";
import PutProductId from "./routes/usa/index.js";
import RegVehiculo from "./routes/transporte/index.js";
import GetInventory from "./routes/clientes/inventario.js";
import GetIdflujo from "./routes/corporativo/porteria.js";
import GetFichaTecnica from "./routes/clientes/fichaTecnica.js";
import getDataSheetSap from "./routes/clientes/fichaTecnica.js";
import GetInvoiceController from "./routes/clientes/invoice.js";
import GetPackingList from "./routes/producto/pack.js";
import logLogin from "./routes/login/index.js";
import Kpi_Alistamiento from "./routes/transporte/wm.js";
import loginWm from "./routes/transporte/wm.js";
import sendMessage from "./routes/mensajeria/mensajeria.js";
import sendMessageChatGoogle from "./routes/mensajeria/mensajeria.js";
import SendSms from "./routes/mensajeria/mensajeria.js";
import GetPorductPrice from "./routes/producto/product.js";
import GetSamples from "./routes/producto/product.js";
import GetQuoteHead from "./routes/clientes/invoice.js";
import PostOrderReference from "./routes/clientes/invoice.js";
import CreateConsecutiveController from "./routes/clientes/invoice.js";
import CreateDetailController from "./routes/clientes/invoice.js";
import GetDetailController from "./routes/clientes/invoice.js";
import DelPosDetailController from "./routes/clientes/invoice.js";
import FinishSalesController from "./routes/clientes/invoice.js";
import GetCentroCiudadController from "./routes/clientes/invoice.js";
import GetDataSheetDrive from "./routes/clientes/fichaTecnica.js";
import listaEntregasUsuario from "./routes/transporte/index.js";
import listOtwithOrder from "./routes/transporte/wm.js";
import listLt22 from "./routes/transporte/wm.js";
import GetEntregaDetailWm from "./routes/transporte/wm.js";
import  getZwmLt01  from "./routes/transporte/wm.js";
import Confirm_Ot from "./routes/transporte/wm.js";
import GetEmpleado from "./routes/corporativo/empleado.js";
import GetInfoPlacaEmpl from "./routes/corporativo/porteria.js";
import GetRoturaController from "./routes/producto/product.js";
import RecordPlateObservation from "./routes/corporativo/porteria.js";
import registraPicking from "./routes/transporte/wm.js";
import GetListActions from "./routes/transporte/index.js"
import ContabilizarEntrega from "./routes/transporte/index.js"
import WeightDelivery from "./routes/transporte/wm.js"
//---------------------------------------------------------------
//App Despacho
import getDespTransportador from "./routes/transporte/index.js";
import getInfoTransportador from "./routes/transporte/index.js";
import getValidarTransportador from "./routes/transporte/index.js";
import getInfoCliente_xEntrega from "./routes/transporte/index.js";
import getConsultar_documentoEntrega from "./routes/transporte/index.js";
import postGrabar_documentoEntrega from "./routes/transporte/index.js";
import getLista_TiposNovedadDespacho from "./routes/transporte/index.js";
import postGrabar_NovedadDespacho from "./routes/transporte/index.js";
import postGrabar_ImagenNovedadDespacho from "./routes/transporte/index.js";
import postGrabar_LocalizacionDespacho from "./routes/transporte/index.js";
import getLista_NovedadDespacho_xDespacho from "./routes/transporte/index.js";
import getLista_NovedadDespachoDetalle_xDespacho from "./routes/transporte/index.js";
import getDetalleNovedad_xCodNovedad from "./routes/transporte/index.js";
import getConsultar_fechaServer from "./routes/transporte/index.js";
import putActualizar_EstadoEntrega from "./routes/transporte/index.js";
import actions_Text_Save from "./routes/transporte/index.js";
import Save_Actions_Value from "./routes/transporte/index.js";
import Save_Actions_Date from "./routes/transporte/index.js";
import Save_Actions_Employee from "./routes/transporte/index.js";
import Save_Actions_List_Value from "./routes/transporte/index.js";
import Save_Actions_List_every_Value from "./routes/transporte/index.js";
import GetAlistamientoAcumulado from "./routes/transporte/wm.js";
import getInfoPallet from "./routes/producto/product.js"
import getCuponList from "./routes/clientes/italpuntos.js"
import GetIndicadorDespacho from "./routes/transporte/index.js"
import GetCliente from "./routes/clientes/index.js"

const app = Express();
const port = process.env.PORT;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Docs Server APIS lilix",
      version: "1.0.0",
      description: "Docs Server APIS lilix",
    },
  },
  apis: ["./routes/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));

const osInfo = {
  platform: os.platform(),
  type: os.type(),
  uptime: os.uptime(),
  hostname: os.hostname(),
};

app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(`IP: ${ip}`);
  next();
});

app.post(process.env.RUTA_LISTAR_SALAS, listarSalas);
app.post(process.env.RUTA_LISTAR_HORARIOS, listarHorarios);
app.post(process.env.RUTA_REGISTRA_TURNOS, RegistrarTurno);
app.post(process.env.RUTA_LOGIN_SAP, LoginSap);
app.post(process.env.RUTA_LOGIN_AD, loginAd);
app.post(process.env.RUTA_LOG_LOGIN, logLogin);
app.post(process.env.RUTA_CISAPARMETROS, GetZcisaparmetros);
app.get(process.env.RUTA_GET_PRODUCTS_USA, GetProductsUsa);
app.put(process.env.RUTA_PUT_PRODUCT_ID, PutProductId);
app.post(process.env.RUTA_REGISTRAR_VEHICULO, RegVehiculo);
app.post(process.env.RUTA_GET_INVENTORY, GetInventory);
app.get(process.env.RUTA_GET_ID_FLUJO, GetIdflujo);
app.get(process.env.RUTA_GET_FICHA_TECNICA, GetFichaTecnica);
app.get(process.env.RUTA_GET_FICHA_TECNICA_SAP, getDataSheetSap);
app.get(process.env.RUTA_GET_PACKING_LIST, GetPackingList);
app.post(process.env.RUTA_INVOICE, GetInvoiceController);
app.post(process.env.RUTA_KPI_ALISTAMIENTO, Kpi_Alistamiento);
app.post(process.env.RUTA_LOGINWM, loginWm);
app.post(process.env.RUTA_MENSAJERIA, sendMessage);
app.post(process.env.RUTA_MENSAJERIA_GOOLGE, sendMessageChatGoogle);
app.post('/mensajeria/sms/', SendSms);
app.post(process.env.RUTA_PRODUCT_PRICE, GetPorductPrice);
app.post(process.env.RUTA_HEAD_QUOTE, GetQuoteHead);
app.post(process.env.RUTA_ORDER_REFERENCE, PostOrderReference);
app.post(process.env.RUTA_PRODUCT_SAMPLE, GetSamples);
app.post(process.env.RUTA_CONSECUTIVE, CreateConsecutiveController);
app.post(process.env.RUTA_CREATE_DETAIL, CreateDetailController);
app.post(process.env.RUTA_GET_DETAIL, GetDetailController);
app.post(process.env.RUTA_DEL_DETAIL, DelPosDetailController);
app.post(process.env.RUTA_FINISH_SALE, FinishSalesController);
app.post(process.env.RUTA_INFO_CIUDAD, GetCentroCiudadController);
app.get(process.env.RUTA_GET_FICHA_DRIVE, GetDataSheetDrive);
app.post(process.env.RUTA_LISTA_ENTREGAS_ALISTAMIENTO, listaEntregasUsuario);
app.post(process.env.RUTA_OT_DETAIL_ORDER, listOtwithOrder);
app.post(process.env.RUTA_LT22, listLt22);
app.post(process.env.RUTA_CONFIRM_OT, Confirm_Ot);
app.get(process.env.RUTA_GET_EMPLEADO, GetEmpleado);
app.get(process.env.RUTA_GET_INFO_PLACA, GetInfoPlacaEmpl);
app.get(process.env.RUTA_GET_ROTURA, GetRoturaController);
app.post(process.env.RUTA_SAVE_NOVEDAD_PLACA, RecordPlateObservation);
app.post(process.env.RUTA_ACTIONS_TEXT_SAVE, actions_Text_Save);
app.post(process.env.RUTA_ACTIONS_VALUE, Save_Actions_Value);
app.post(process.env.RUTA_ACTIONS_DATE, Save_Actions_Date);
app.post(process.env.RUTA_SAVE_ACTIONS_EMPLOYEE, Save_Actions_Employee);
app.post(process.env.RUTA_SAVE_ACTIONS_LIST_VALUE, Save_Actions_List_Value);
app.post(process.env.RUTA_ACTIONS_LIST_EVERY_VALUE,Save_Actions_List_every_Value);
app.get('/transporte/detalleEntrega/:entrega', GetEntregaDetailWm)
app.get('/transporte/alistamientoAcumulado/:entrega/:posot/:ot',GetAlistamientoAcumulado)
app.get('/transporte/alistamientoWm/:ubicacionOrigen/:almacen/:ubicacionDestino/:centro/:cantidad/:material/:lote/:pallet/:bandera/:loteDestino/:usuario',getZwmLt01)
app.post('/transporte/Registraalistamiento/',registraPicking)
app.post('/transporte/listaAcciones/',GetListActions)
app.get('/producto/infopallet/:pallet/:lote/:material',getInfoPallet)
app.get('/transporte/contab-entrega/:entrega/:bandera/',ContabilizarEntrega)
app.get('/transporte/pesoentrega/:entrega',WeightDelivery)
app.post('/clientes/italpuntos/CuponList/',getCuponList)
app.get('/transporte/indicadorDespacho/:ptoExp/',GetIndicadorDespacho)
app.post('/clientes/getcliente/',GetCliente)

//appDespacho
app.get(process.env.RUTA_GET_DESPACHO_XCC, getDespTransportador);
app.get(process.env.RUTA_GET_INFOTRANSPORTADOR_XCC, getInfoTransportador);
app.get(process.env.RUTA_GET_VALIDARTRANSPORTADOR, getValidarTransportador);
app.get(process.env.RUTA_GET_CLIENTE_XENTREGA, getInfoCliente_xEntrega);
app.get(process.env.RUTA_GET_DOCUMENTO_XENTREGA, getConsultar_documentoEntrega);
app.post(process.env.RUTA_POST_GRABAR_DOCUMENTO_ENTREGA,postGrabar_documentoEntrega);
app.get(process.env.RUTA_GET_LISTA_TIPOSNOVEDAD_DESPACHO, getLista_TiposNovedadDespacho);
app.post(process.env.RUTA_POST_GRABAR_NOVEDAD_DESPACHO,postGrabar_NovedadDespacho);
app.post(process.env.RUTA_POST_GRABAR_IMAGENNOVEDAD_DESPACHO,postGrabar_ImagenNovedadDespacho);
app.post(process.env.RUTA_POST_GRABAR_LOCALIZACION_DESPACHO,postGrabar_LocalizacionDespacho);
app.get(process.env.RUTA_GET_LISTA_NOVDESP_XDESP,getLista_NovedadDespacho_xDespacho);
app.get(process.env.RUTA_GET_LISTA_NOVDESPDET_XDESP,getLista_NovedadDespachoDetalle_xDespacho);
app.get(process.env.RUTA_GET_DETALLE_NOVDESP_XCODNOVDESP,getDetalleNovedad_xCodNovedad);
app.get(process.env.RUTA_GET_FECHASERV, getConsultar_fechaServer);
app.put(process.env.RUTA_PUT_ACTUALIZAR_ENTREGA, putActualizar_EstadoEntrega);
//appDespacho

if (osInfo.platform === "linux") {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CRT),
    ca: fs.readFileSync(process.env.SSL_CA),
  };
  https.createServer(options, app).listen(port, () => {
    console.log(`cisa listening on port ${port}`);
    console.log(`Documentación Swagger disponible en https://lilix.ceramicaitalia.com:${port}/api-docs`);
  });
} else {
  app.listen(port, () => {
    console.log(`cisa listening on port ${port}`);
    console.log(`Documentación Swagger disponible en http://localhost:${port}/api-docs`);
  });
}
