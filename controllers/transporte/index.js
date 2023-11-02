
import {RegistraVehiculo} from '../../db/transporte/index.js'


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
    
    