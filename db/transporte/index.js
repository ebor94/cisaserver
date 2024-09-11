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
          // console.log(result)
           return result.recordset
       }).catch(err => {
           console.log(err)
           return err
       })
   
   return listaSalas
   
   }

export const listaEntregaUsuario = async(user)=>{

    const listaEntrega =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('usuario', sql.VarChar, user)
        .execute('lista_Entrega_Usuario')
      }) .then(result => {
        // console.log(result)
         return result.recordset
     }).catch(err => {
         //console.log(err)
         return err
     })

     return listaEntrega;
}


//------------------------------------------------------------------------------------------------------------------
// Funciones usadas en app_despacho
//------------------------------------------------------------------------------------------------------------------

/***
 * Consultar un despacho con sus entregas por cc de transportador
 * @param - cc
*/
//ejemplo consumo: http://localhost:3000/transporte/desp_transportador/19481059
//export const getDespTransportador_model =  async(req,res)=>{
export const getDespTransportador_model = async(cc)=>{
    //console.log('en modelo', cc)
    
    const DespTransportador =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('TIPO', sql.VarChar, 'ENTREGAS_X_CC')
        .input('VALOR', sql.VarChar, cc)
        .execute('ConsultasTransportador')
      }) .then(result => {
        // console.log(result)
         return result.recordset
     }).catch(err => {
         //console.log(err)
         return err
     })
     return DespTransportador;
}   

/***
 * Consultar informacion general de un transportador
 * @param - cc
 */
export const getInfoTransportador_model = async(cc)=>{
    //console.log('en modelo', cc)
    
    const infoTransportador =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('TIPO', sql.VarChar, 'TRANSPORTADOR_X_CC')
        .input('VALOR', sql.VarChar, cc)
        .execute('ConsultasTransportador')
      }) .then(result => {
        // console.log(result)
         return result.recordset
     }).catch(err => {
         //console.log(err)
         return err
     })
     return infoTransportador;
}   

/**
 * Validar transportador
 * @param - parametros de entrada: cc, tel, placa 
 * @param - retorna: 
 */
export const getValidarTransportador_model = async(cc,tel,placa)=>{
    //console.log('en modelo', cc)
    
    const infoTransportador =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('cedula', sql.VarChar, cc)
        .input('telefono', sql.VarChar, tel)
        .input('placavehiculo', sql.VarChar, placa)
        .execute('ValidarTransportador')
      }) .then(result => {
        // console.log(result)
         return result.recordset
     }).catch(err => {
         //console.log(err)
         return err
     })
     return infoTransportador;
}   



export const getValidarTransportador_model_ =  async(cc,tel,placa)=>{
    //http://localhost:3000/transporte/validar_transportador/19481059/3106803818/BGF044
    
        try {
            // Conectar a la base de datos
            const pool = await poolSQLServ;
            
            console.log('Conexión a la base de datos exitosa.');
            //console.log(req.params.cc);
           
            // Puedes realizar una consulta de prueba aquí si lo deseas
            let sql=`execute ValidarTransportador '${cc}','${ tel }','${ placa }'`
    
            let result = await pool.query(sql);
            console.log('Resultado de prueba:', result.recordset);
            return(result.recordset);
            
            // Cerrar la conexión, cerrar genera error, dejarla abierta
            //pool.close();
        } catch (err) {
            console.error('Error de conexión:', err);
        }
    }   
