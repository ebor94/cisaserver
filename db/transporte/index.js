import sql from 'mssql'
import {configVselect} from '../config.js'


export const RegistraVehiculo = async (tipo,
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
    TelVivienda)=>{

    const listaSalas =  sql.connect(configVselect).then(pool => {   
       return pool.request()
            .input('tipo',                sql.VarChar, tipo)
            .input('Placa',               sql.VarChar, Placa)
            .input('Marca',               sql.VarChar, Marca)
            .input('Modelo',              sql.VarChar, Modelo)
            .input('NoLicencia',          sql.VarChar, NoLicencia)
            .input('NoMotor',             sql.VarChar, NoMotor)
            .input('NoChasis',            sql.VarChar, NoChasis)
            .input('TipoServicio',        sql.VarChar, TipoServicio)
            .input('Cilindraje',          sql.Decimal, Cilindraje )
            .input('Color',               sql.VarChar, Color)
            .input('ClaseVehiculo',       sql.VarChar, ClaseVehiculo)
            .input('TipoCarroceria',      sql.VarChar, TipoCarroceria)
            .input('Combustible',         sql.VarChar, Combustible)
            .input('CapMaxCarga',         sql.Int,     CapMaxCarga)
            .input('PesoBrutovehicular',  sql.Int,     PesoBrutovehicular)
            .input('NOPuestas',           sql.VarChar, NOPuestas)
            .input('LimitacionPropiedad', sql.VarChar, LimitacionPropiedad)
            .input('UltimoTramite',       sql.VarChar, UltimoTramite)
            .input('OrganismoTransito',   sql.VarChar, OrganismoTransito)
            .input('FechaExpedicion',     sql.DateTime, FechaExpedicion)
            .input('ImportacionNo',       sql.VarChar, ImportacionNo)
            .input('CiudadImportacion',   sql.VarChar, CiudadImportacion)
            .input('FechaImportacion',    sql.DateTime, FechaImportacion)
            .input('IdentifPropietrario', sql.VarChar, IdentifPropietrario)
            .input('NombrePropietario',   sql.VarChar, NombrePropietario)
            .input('ApellidosPropietario',sql.VarChar, ApellidosPropietario)
            .input('DirPropietario',      sql.VarChar, DirPropietario)
            .input('CiudadPropietario',   sql.VarChar, CiudadPropietario)
            .input('TelVivienda',         sql.VarChar, TelVivienda)
          .execute('sp_TteTarjetaVehiculo')
       }).then(result => {
           console.log(result.recordset)
           return result.recordset
       }).catch(err => {
           console.log(err)
           return err
       })
   
   return listaSalas
   
   }


   
