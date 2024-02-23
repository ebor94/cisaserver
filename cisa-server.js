import  Express  from "express";
import bodyParser from "body-parser";
import cors from "cors"
import listarSalas from "./routes/institucional/index.js";
import listarHorarios from "./routes/institucional/index.js";
import RegistrarTurno from "./routes/institucional/index.js";
import LoginSap  from "./routes/login/index.js";
import loginAd  from "./routes/login/index.js";
import GetProductsUsa from "./routes/usa/index.js" ;
import PutProductId from "./routes/usa/index.js" ;
import RegVehiculo from "./routes/transporte/index.js";
import GetInventory  from "./routes/clientes/inventario.js";
import GetIdflujo from './routes/corporativo/porteria.js';
import GetFichaTecnica from "./routes/clientes/fichaTecnica.js";
import getDataSheetSap from "./routes/clientes/fichaTecnica.js";
import GetPackingList from "./routes/producto/pack.js";
//import GetBim from "./routes/clientes/bim.js";
import logLogin from "./routes/login/index.js";
import https from "https";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()

const app = Express();
const port  = process.env.PORT || "3001"
//const domain = "ceramicaitalia.com"
app.use((req, res, next) => {
    // Dominio que tengan acceso 
       res.setHeader('Access-Control-Allow-Origin', "*");    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');    
    // Encabecedados que permites 
       res.setHeader('Access-Control-Allow-Headers', '*');    
    next();
    })
app.use(cors({origin: '*'}));    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = {
   key : fs.readFileSync("/etc/pki/SSL_cert/wildcard_ceramicaitalia_com.key"),
   cert: fs.readFileSync("/etc/pki/SSL_cert/wildcard_ceramicaitalia_com.crt"),
   ca  : fs.readFileSync("/etc/pki/SSL_cert/DigiCertCA.crt")
};

app.post('/listarSalas',listarSalas)
app.post('/listarHorarios',listarHorarios)
app.post('/RegistrarTurno',RegistrarTurno)
app.post('/loginsap', LoginSap)
app.post('/loginAd/', loginAd)
app.post('/logLogin/', logLogin)
app.get('/usa/productId', GetProductsUsa)
app.put('/usa/PutProductId', PutProductId)
app.post('/transporte/regVehiculo', RegVehiculo)
app.post('/clientes/inventario', GetInventory)
app.get('/corporativo/porteria/:id', GetIdflujo)
app.get('/clientes/ft/:codsap', GetFichaTecnica)
app.get('/clientes/ftsap/:codsap', getDataSheetSap)
app.get('/producto/pack/:codsap', GetPackingList)
//app.get('/clientes/bim/:bandera', GetBim)
 https.createServer(options,app).listen(port, () => {
    console.log(`cisa listening on port ${port}`)
 }); 

