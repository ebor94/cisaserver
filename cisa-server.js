import  Express  from "express";
import bodyParser from "body-parser";
import listarSalas from "./routes/institucional/index.js";
import listarHorarios from "./routes/institucional/index.js";
import RegistrarTurno from "./routes/institucional/index.js";
import https from "https";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()

const app = Express();
const port  = process.env.PORT || "3001"
const host = "ceramicaitalia.com"
app.use((req, res, next) => {
    // Dominio que tengan acceso 
       res.setHeader('Access-Control-Allow-Origin', "*");    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');    
    // Encabecedados que permites 
       res.setHeader('Access-Control-Allow-Headers', '*');    
    next();
    })
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = {
   key : fs.readFileSync("/etc/pki/SSL_cert/wildcard_ceramicaitalia_com.key"),
   cert: fs.readFileSync("/etc/pki/SSL_cert/wildcard_ceramicaitalia_com.crt"),
   ca  : fs.readFileSync("/etc/pki/SSL_cert/DigiCertCA.crt")
};

app.get('/listarSalas',listarSalas)
app.get('/listarHorarios',listarHorarios)
app.post('/RegistrarTurno',RegistrarTurno)

 https.createServer(options,app).listen(port, () => {
    console.log(`cisa listening on port ${port}`)
   
  }); 

