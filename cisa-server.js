import  Express  from "express";
import bodyParser from "body-parser";
import cors from "cors"
import os  from "os";
import https from "https";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()

// import  IpFilter  from 'express-ipfilter';
// import  IpDeniedError from 'express-ipfilter';


import listarSalas from "./routes/institucional/index.js";
import listarHorarios from "./routes/institucional/index.js";
import RegistrarTurno from "./routes/institucional/index.js";
import LoginSap  from "./routes/login/index.js";
import loginAd  from "./routes/login/index.js";
import GetZcisaparmetros  from "./routes/login/index.js";
import GetProductsUsa from "./routes/usa/index.js" ;
import PutProductId from "./routes/usa/index.js" ;
import RegVehiculo from "./routes/transporte/index.js";
import GetInventory  from "./routes/clientes/inventario.js";
import GetIdflujo from './routes/corporativo/porteria.js';
import GetFichaTecnica from "./routes/clientes/fichaTecnica.js";
import getDataSheetSap from "./routes/clientes/fichaTecnica.js";
import GetInvoiceController from "./routes/clientes/invoice.js";
import GetPackingList from "./routes/producto/pack.js";
//import GetBim from "./routes/clientes/bim.js";
import logLogin from "./routes/login/index.js";
import loginWm from "./routes/transporte/wm.js"
import sendMessage from "./routes/mensajeria/mensajeria.js"
import GetPorductPrice from "./routes/producto/product.js"
import GetQuoteHead   from "./routes/clientes/invoice.js";
import PostOrderReference from "./routes/clientes/invoice.js";




const app = Express();
const port  = process.env.PORT || "3001"
//const domain = "ceramicaitalia.com"

const ips = process.env.IP_RANGE

// Configura el middleware de IpFilter
// app.use(IpFilter(ips, { mode: 'allow' }));

// // Manejo de errores de acceso denegado
// app.use((err, req, res, next) => {
//   if (err instanceof IpDeniedError) {
//     res.status(403).send('Access denied');
//   } else {
//     next();
//   }
// })               


app.use((req, res, next) => {
    // Dominio que tengan acceso 
       res.setHeader('Access-Control-Allow-Origin', "*");    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST');    
   
    next();
    })
app.use(cors({origin: '*'}));    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const osInfo = {
   platform: os.platform(),
   type: os.type(),
   uptime: os.uptime(),
   hostname: os.hostname(),
   
};

console.log(osInfo)

// Middleware para capturar y mostrar la IP
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`IP: ${ip}`);  
  next();
});



app.post(process.env.RUTA_LISTAR_SALAS,listarSalas)
app.post(process.env.RUTA_LISTAR_HORARIOS,listarHorarios)
app.post(process.env.RUTA_REGISTRA_TURNOS,RegistrarTurno)
app.post(process.env.RUTA_LOGIN_SAP, LoginSap)
app.post(process.env.RUTA_LOGIN_AD, loginAd)
app.post(process.env.RUTA_LOG_LOGIN, logLogin)
app.post(process.env.RUTA_CISAPARMETROS, GetZcisaparmetros)
app.get(process.env.RUTA_GET_PRODUCTS_USA, GetProductsUsa)
app.put(process.env.RUTA_PUT_PRODUCT_ID, PutProductId)
app.post(process.env.RUTA_REGISTRAR_VEHICULO , RegVehiculo)
app.post(process.env.RUTA_GET_INVENTORY, GetInventory)
app.get(process.env.RUTA_GET_ID_FLUJO , GetIdflujo)
app.get(process.env.RUTA_GET_FICHA_TECNICA, GetFichaTecnica)
app.get(process.env.RUTA_GET_FICHA_TECNICA_SAP, getDataSheetSap)
app.get(process.env.RUTA_GET_PACKING_LIST, GetPackingList)
app.post(process.env.RUTA_INVOICE , GetInvoiceController)
app.post(process.env.RUTA_LOGINWM, loginWm)
app.post(process.env.RUTA_MENSAJERIA,sendMessage)
app.post(process.env.RUTA_PRODUCT_PRICE,GetPorductPrice)
app.post(process.env.RUTA_HEAD_QUOTE, GetQuoteHead)
app.post(process.env.RUTA_ORDER_REFERENCE , PostOrderReference)

//app.get('/clientes/bim/:bandera', GetBim)

if (osInfo.platform === 'linux'){
const options = {
   key : fs.readFileSync(process.env.SSL_KEY),
   cert: fs.readFileSync(process.env.SSL_CRT),
   ca  : fs.readFileSync(process.env.SSL_CA)
};
 https.createServer(options,app).listen(port, () => {
    console.log(`cisa listening on port ${port}`)
    
 }); 

}else{

   app.listen(port, () => {
      console.log(`cisa listening on port ${port}`)
      
   });
   
}

