
import { actionsTextSave, List_actions, Save_Action_Date,  Save_Action_Employee, Save_Action_List_every_Value, Save_Action_List_Value, Save_Action_Value } from '../../db/acciones/index.js'
import { basculaGuardarPeso, IndicadorDespacho, listaEntregaUsuario, RegistraVehiculo} from '../../db/transporte/index.js'
import { DespTransportador_model, InfoTransportador_model, ValidarTransportador_model } from '../../db/transporte/index.js'
import { InfoCliente_xEntrega_model } from '../../db/transporte/index.js'
import { InfoTransportador_xEntrega_model } from '../../db/transporte/index.js'
import { Consultar_documentoEntrega_model } from '../../db/transporte/index.js'
import { Grabar_documentoEntrega_model } from '../../db/transporte/index.js'
import { Lista_TiposNovedadDespacho_model } from '../../db/transporte/index.js'
import { Grabar_NovedadDespacho_model, Grabar_ImagenNovedadDespacho_model } from '../../db/transporte/index.js'
import { Grabar_LocalizacionDespacho_model } from '../../db/transporte/index.js'

import { Lista_NovedadDespacho_xDespacho_model } from '../../db/transporte/index.js'
import { Lista_NovedadDespachoDetalle_xDespacho_model } from '../../db/transporte/index.js'
import { DetalleNovedad_xCodNovedad_model } from '../../db/transporte/index.js'

import { Consultar_fechaServer_model } from '../../db/transporte/index.js'
import { Actualizar_EstadoEntrega_model } from '../../db/transporte/index.js'
import { contabilizarEntrega } from '../../services/sap/invoice.js'




//-------------------------------------------
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
  // console.log(listaEntregas)
   const entregas = listaEntregas.reduce((acc, item) =>{
      if (!acc[item.Despacho_no]) {
         acc[item.Despacho_no] = {
             Despacho_no: item.Despacho_no,
             ordenes: [],
             Fecha_Requerida: item.Fecha_Requerida,
             despachoVerificado : item.despachoverificado  
             

         };
     } 
     
     // Agregamos el ord_no al array de ordenes
     acc[item.Despacho_no].ordenes.push({entrega : item.ord_no, accion : item.Accion , placa: item.placa,
      cte : item.cus_name, estadoEntrega : item.EntregaVerificada });
     
     return acc;

   },{});
   const depachoEntregas = Object.values(entregas);
   return depachoEntregas;
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
   const infoDespTransportador= await  DespTransportador_model(cc)
   //res.json(infoDespTransportador);
   return infoDespTransportador;
}   

/***
 * Consultar informacion general de un transportador
 * @param - cc
 */
export const getInfoTransportador =  async(req)=>{
   const cc = req
   const infoTransportador= await InfoTransportador_model(cc)
   //res.json(infoDespTransportador); //este no usar
   return infoTransportador;
}   

export const getValidarTransportador =  async(cc,tel,placa)=>{
   const cedula = cc;
   const telefono = tel;
   const placavehiculo = placa;

   const infoTransportador= await ValidarTransportador_model(cedula,telefono,placavehiculo)
   //res.json(infoDespTransportador); //este no usar
   return infoTransportador;
}   

export const getInfoCliente_xEntrega =  async(entrega)=>{
   const num_entrega = entrega;
   
   const infoCliente= await InfoCliente_xEntrega_model(num_entrega)
   //res.json(infoDespTransportador); //este no usar
   return infoCliente;
}   

export const getInfoTransportador_xEntrega =  async(entrega)=>{
  const num_entrega = entrega;
  
  const infoTrans= await InfoTransportador_xEntrega_model(num_entrega)
  //res.json(infoDespTransportador); //este no usar
  return infoTrans;
}   

//bd app_despacho
export const getConsultar_documentoEntrega =  async(entrega)=>{
   const num_entrega = entrega;
   
   const infoCliente= await Consultar_documentoEntrega_model(num_entrega)
   //res.json(infoDespTransportador); //este no usar
   return infoCliente;
}   
//bd app_despacho
export const postGrabar_documentoEntrega =  async(data)=>{
   let {entrega, tipoDocumento, imgBase64, latitude, longitude, docConfirmado, usuario } = data;
   const estadoGrabar= await Grabar_documentoEntrega_model({entrega, tipoDocumento, imgBase64, latitude, longitude, docConfirmado, usuario })
   //res.json(infoDespTransportador); //este no usar
   return estadoGrabar;
}   

//bd app_despacho
export const getLista_TiposNovedadDespacho =  async()=>{
   //const {entrega, tipoDocumento, imgBase64, latitude, longitude, docConfirmado, usuario } = data;
   const listTiposNov= await Lista_TiposNovedadDespacho_model()
   //res.json(infoDespTransportador); //este no usar
   return listTiposNov;
}   

//bd app_despacho
export const postGrabar_NovedadDespacho =  async(data)=>{
   let {despacho, TipoNovedadDesp, entrega, observacion, latitude, longitude, usuario } = data;
   const estadoGrabar=  await Grabar_NovedadDespacho_model({despacho, TipoNovedadDesp, entrega, observacion, latitude, longitude, usuario })
   //res.json(estadoGrabar); //este no usar
   return estadoGrabar;
} 

//bd app_despacho
export const postGrabar_ImagenNovedadDespacho =  async(data)=>{
   let {CodNovedadDesp, imgBase64, usuario } = data;
   const estadoGrabar= await Grabar_ImagenNovedadDespacho_model({CodNovedadDesp, imgBase64, usuario })
   //res.json(infoDespTransportador); //este no usar
   return estadoGrabar;
} 

//bd app_despacho
export const postGrabar_LocalizacionDespacho =  async(data)=>{
   const {despacho, latitude, longitude, fechaDispositivo,  usuario } = data;
   const estadoGrabar= await Grabar_LocalizacionDespacho_model({ despacho, latitude, longitude, fechaDispositivo,  usuario })
   //res.json(infoDespTransportador); //este no usar
   return estadoGrabar;
} 

//--------------
//bd app_despacho
export const getLista_NovedadDespacho_xDespacho =  async(despacho)=>{
   const desp = despacho;

   const listNovDesp= await Lista_NovedadDespacho_xDespacho_model(desp)
   //res.json(infoDespTransportador); //este no usar
   return listNovDesp;
}   
//-------------
//bd app_despacho
export const getLista_NovedadDespachoDetalle_xDespacho =  async(despacho)=>{
   const desp = despacho;

   const listNovDesp= await Lista_NovedadDespachoDetalle_xDespacho_model(desp)
   //res.json(infoDespTransportador); //este no usar
   return listNovDesp;
}   

//-------------
//bd app_despacho
export const getDetalleNovedad_xCodNovedad =  async(codNovDespacho)=>{
   const codNovDesp = codNovDespacho;

   const DetNov= await DetalleNovedad_xCodNovedad_model(codNovDesp)
   //res.json(infoDespTransportador); //este no usar
   return DetNov;
}
//------------------
//bd app_despacho
export const getConsultar_fechaServer =  async(formato_fecha)=>{
   const formato = formato_fecha;

   const response= await Consultar_fechaServer_model(formato)
   //res.json(infoDespTransportador); //este no usar
   return response;
}
//bd cisa_web_tte
export const putActualizar_EstadoEntrega =  async(data)=>{
   const {entrega,anio,mes,dia,hora,estado,comportamiento,observaciones,devolver_valores } = data;
   const response= await Actualizar_EstadoEntrega_model({ entrega,anio,mes,dia,hora,estado,comportamiento,observaciones,devolver_valores })
   //res.json(infoDespTransportador); //este no usar
   return response;
} 


export const actions_Text_Save  = async (data) => {
  
   const {codDestinatario,codTipoDoc,docNo,texto,accion,usuario} = data
    try {
      const response = await  actionsTextSave(codDestinatario,codTipoDoc,docNo,texto,accion,usuario);
    
     if (!response || response.length === 0) {
       return {
         success: false,
         message: "registro fallido",
         data: null
       };
     }
 
     return {
       success: true,
       message: "registro exitoso",
       data: response
     };

   } catch (error) {
     //console.error("Error en getInfoPlaca:", error);
     return {
       success: false,
       message: "Ocurrió un error al registrar",
       error: error.message
     };
   
   }
   
}
export const Save_Actions_Value   = async (data) => {
   const {codDestinatario,codTipoDoc,docNo,txtValor,accion,usuario} = data
    try {
      const response = await  Save_Action_Value(codDestinatario,codTipoDoc,docNo,txtValor,accion,usuario);
    
     if (!response || response.length === 0) {
       return {
         success: false,
         message: "registro fallido",
         data: null
       };
     }
 
     return {
       success: true,
       message: "registro exitoso",
       data: response
     };

   } catch (error) {
     //console.error("Error en getInfoPlaca:", error);
     return {
       success: false,
       message: "Ocurrió un error al registrar",
       error: error.message
     };
   
   }
   
}
export const Save_Actions_Date = async (data) => {
   let {codDestinatario,codTipoDoc,docNo,fecha,accion,usuario,hora} = data
   
    try {
      const response = await  Save_Action_Date(codDestinatario,codTipoDoc,docNo,fecha,accion,usuario,hora);
    
     if (!response || response.length === 0) {
       return {
         success: false,
         message: "registro fallido",
         data: null
       };
     }
 
     return {
       success: true,
       message: "registro exitoso",
       data: response
     };

   } catch (error) {
     //console.error("Error en getInfoPlaca:", error);
     return {
       success: false,
       message: "Ocurrió un error al registrar",
       error: error.message
     };
   
   }
   
}
export const Save_Actions_Employee = async (data) => {
   const {codDestinatario,codTipoDoc,docNo,empleado,accion,usuario} = data
    try {
      const response = await  Save_Action_Employee(codDestinatario,codTipoDoc,docNo,empleado,accion,usuario);
    
     if (!response || response.length === 0) {
       return {
         success: false,
         message: "registro fallido",
         data: null
       };
     }
 
     return {
       success: true,
       message: "registro exitoso",
       data: response
     };

   } catch (error) {
     //console.error("Error en getInfoPlaca:", error);
     return {
       success: false,
       message: "Ocurrió un error al registrar",
       error: error.message
     };
   
   }
   
}
export const Save_Actions_List_Value = async (data) => {
   const {codDestinatario,codTipoDoc,docNo,opcion,accion,usuario} = data
    try {
      const response = await  Save_Action_List_Value(codDestinatario,codTipoDoc,docNo,opcion,accion,usuario);
    
     if (!response || response.length === 0) {
       return {
         success: false,
         message: "registro fallido",
         data: null
       };
     }
 
     return {
       success: true,
       message: "registro exitoso",
       data: response
     };

   } catch (error) {
     //console.error("Error en getInfoPlaca:", error);
     return {
       success: false,
       message: "Ocurrió un error al registrar",
       error: error.message
     };
   
   }
   
}
export const Save_Actions_List_every_Value = async (data) => {
   const {codDestinatario,codTipoDoc,docNo,opcion,accion,usuario,insertar} = data
    try {
      const response = await  Save_Action_List_every_Value(codDestinatario,codTipoDoc,docNo,opcion,accion,usuario,insertar);
    
     if (!response || response.length === 0) {
       return {
         success: false,
         message: "registro fallido",
         data: null
       };
     }
 
     return {
       success: true,
       message: "registro exitoso",
       data: response
     };

   } catch (error) {
     //console.error("Error en getInfoPlaca:", error);
     return {
       success: false,
       message: "Ocurrió un error al registrar",
       error: error.message
     };
   
   }
   
}

export const GetListActions = async (data) => {
  const {codDestinatario,codTipoDoc,ordNo, campoLibre4, campoLibre2} = data;
  try {
    const response =  await List_actions(codDestinatario,codTipoDoc,ordNo, campoLibre4, campoLibre2);
    if (!response || response.length === 0) {
      return {
        success: false,
        message: "fallido",
        data: null
      };
    }

    return {
      success: true,
      message: "exitoso",
      data: response
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Ocurrió un error al registrar",
      error: error.message
    };
  }
}
export const  ContabilizarEntrega = async (entrega, bandera) => {
  try {

      let response = await contabilizarEntrega(entrega,bandera)
      
      if (!response || response.length === 0) {
          return {
            success: false,           
            data: null
          };
        }
    
        return {
          success: true,        
          data: response
        };
   
      } catch (error) {
         return {
          success: false,         
          error: error.message
        };
      
      }
}

export const  GetIndicadorDespacho = async (ptoExp) => {
  try {
     
      let response = await IndicadorDespacho(ptoExp)
      
      if (!response || response.length === 0) {
          return {
            success: false,           
            data: null
          };
        }
    
        return {
          success: true,        
          data: response
        };
   
      } catch (error) {
         return {
          success: false,         
          error: error.message
        };
      
      }
}

export const grabarPesoBascula = async ( nombreMaquina, peso, contador) => {

  try {
     
    let response = await basculaGuardarPeso( nombreMaquina, peso, contador)
    
    if (!response || response.length === 0) {
        return {
          success: false,           
          data: null
        };
      }
  
      return {
        success: true,        
        data: response
      };
 
    } catch (error) {
       return {
        success: false,         
        error: error.message
      };
    
    }
}
