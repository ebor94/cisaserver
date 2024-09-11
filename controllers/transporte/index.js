
import { listaEntregaUsuario, RegistraVehiculo} from '../../db/transporte/index.js'
import { getDespTransportador_model, getInfoTransportador_model, getValidarTransportador_model } from '../../db/transporte/index.js'



export const regVehiculo = async (data)=>{

    let tipo                = data.tipo;
    let Placa               = data.Placa;
    let Marca               = data.Marca;
    let Modelo              = data.Modelo;
    let NoLicencia          = data.NoLicencia;
    let NoMotor             = data.NoMotor;
    let NoChasis            = data.NoChasis;
    let TipoServicio        = data.TipoServicio;
    let Cilindraje          = data.Cilindraje ;
    let Color               = data.Color;
    let ClaseVehiculo       = data.ClaseVehiculo;
    let TipoCarroceria      = data.TipoCarroceria;
    let Combustible         = data.Combustible;
    let CapMaxCarga         = data.CapMaxCarga;
    let PesoBrutovehicular  = data.PesoBrutovehicular;
    let NOPuestas           = data.NOPuestas;
    let LimitacionPropiedad = data.LimitacionPropiedad;
    let UltimoTramite       = data.UltimoTramite;
    let OrganismoTransito   = data.OrganismoTransito;
    let FechaExpedicion     = data.FechaExpedicion;
    let ImportacionNo       = data.ImportacionNo;
    let CiudadImportacion   = data.CiudadImportacion;
    let FechaImportacion    = data.FechaImportacion;
    let IdentifPropietrario = data.IdentifPropietrario;
    let NombrePropietario   = data.NombrePropietario;
    let ApellidosPropietario= data.ApellidosPropietario;
    let DirPropietario      = data.DirPropietario;
    let CiudadPropietario   = data.CiudadPropietario;
    let TelViviend          = data.TelViviend;

  
    let response;
    const resData = await RegistraVehiculo(tipo,
        Placa,
        Marca,
        Modelo,
        NoLicencia,
        NoMotor,
        NoChasis,
        TipoServicio,
        Cilindraje ,
        Color,
        ClaseVehiculo,
        TipoCarroceria,
        Combustible,
        CapMaxCarga,
        PesoBrutovehicular,
        NOPuestas,
        LimitacionPropiedad,
        UltimoTramite,
        OrganismoTransito,
         FechaExpedicion,
        ImportacionNo,
        CiudadImportacion,
         FechaImportacion,
        IdentifPropietrario,
        NombrePropietario,
        ApellidosPropietario,
        DirPropietario,
        CiudadPropietario,
        TelViviend)

     if(resData[0].Placa === Placa){
        response ="Exitoso"
     }else{
        response ="Error de Registro"
     }   
return  response;
}


export const listaEntregasUsuario = async(data) =>{
   let usuario = data.user;
   const listaEntregas  = await listaEntregaUsuario(usuario);
   const entregas = listaEntregas.map(order => order.ord_no);
   return entregas;
} 

//------------------------------------------------------------------------------------------------------------------
// Funciones usadas en app_despacho
//------------------------------------------------------------------------------------------------------------------

/***
 * Consultar un despacho con sus entregas por cc de transportador
 * @param - cc
*/
export const getDespTransportador =  async(req)=>{
   //export const getDespTransportador =  async(req,res)=>{
   //consumo: http://localhost:3000/transporte/desp_transportador/19481059
   //console.log('en el controlador',req)
   
   const cc = req
   const infoDespTransportador= await  getDespTransportador_model(cc)
   //res.json(infoDespTransportador);
   return infoDespTransportador;
}   

/***
 * Consultar informacion general de un transportador
 * @param - cc
 */
export const getInfoTransportador =  async(req)=>{
   const cc = req
   const infoTransportador= await getInfoTransportador_model(cc)
   //res.json(infoDespTransportador); //este no usar
   return infoTransportador;
}   

export const getValidarTransportador =  async(cc,tel,placa)=>{
   const cedula = cc;
   const telefono = tel;
   const placavehiculo = placa;

   const infoTransportador= await getValidarTransportador_model(cedula,telefono,placavehiculo)
   //res.json(infoDespTransportador); //este no usar
   return infoTransportador;
}   



