import sql from 'mssql'
import {configVselect} from '../config.js'
import {configMSSQLServ_appdespacho} from '../config.js'
//const configAppdespacho = configMSSQLServ_appdespacho;


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

/**
 * Consultar cliente por numero de entrega
 * @param - entrega: numero de entrega
 */
export const getInfoCliente_xEntrega_model = async(entrega)=>{
    //console.log('en modelo', cc)
    
    const infoClinte =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('TIPO', sql.VarChar, 'CLIENTE_X_ENTREGA')
        .input('VALOR', sql.VarChar, entrega)
        .execute('ConsultasTransportador')
      }) .then(result => {
        // console.log(result)
         return result.recordset
     }).catch(err => {
         //console.log(err)
         return err
     })
     return infoClinte;
}   


/**
 * Consultar los documentos (foto) que se han subido a la bd, consulta por numero de entrega
 * @param - de Entrada: entrega
 * @param - de Salida: codDocEntrega,fkord_no,fkCodTipoConfEntrega,DesTipoConfEntrega,imagenBase64,	fechaActualizacion,
 * @param - de Salida: latitude,longitude,documentoConfirmado,usuarioActualiza,	usuarioBD
 */
export const Consultar_documentoEntrega_model = async(entrega)=>{
    console.log('en modelo', entrega)
    
    const docEntrega =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
        return pool.request()
        .input('ord_no', sql.VarChar, '60607820')
        .execute('Consultar_documentoEntrega')
      }) .then(result => {
         console.log('en result', result)
         return result.recordset
     }).catch(err => {
         console.log(err)
         return err
     })
     return docEntrega;
}   



/**
 * Grabar los documentos (foto) en bd para confirmar la entrega
 * @param - entrega, tipoDocumento, imgBase64, latitud, longitud, docConfirmado, usuario
 * @param - de Salida: "resultado": "Registrado" o "resultado": "Actualizado"
 */

export const Grabar_documentoEntrega_model = async(req)=>{
    const {entrega, tipoDocumento, imgBase64, latitud, longitud, docConfirmado, usuario } = req;
    //console.log('en modelo', cc)
    
    const docEntrega =  sql.connect(configAppdespacho).then(pool => {
        return pool.request()
        .input('entrega', sql.VarChar, entrega)
        .input('tipoDocumento', sql.VarChar, tipoDocumento)
        .input('imgBase64', sql.VarChar, imgBase64)
        .input('latitud', sql.VarChar, latitud)
        .input('longitud', sql.VarChar, longitud)
        .input('docConfirmado', sql.VarChar, docConfirmado)
        .input('usuario', sql.VarChar, usuario)

        .execute('app_Despacho.dbo.Grabar_DocumentoEntrega')
      }) .then(result => {
        // console.log(result)
         return result.recordset
     }).catch(err => {
         //console.log(err)
         return err
     })
     return docEntrega;
}   

export const postGrabar_documentoEntrega_model =  async(req)=>{
        const {entrega, tipoDocumento, imgBase64, latitud, longitud, docConfirmado, usuario } = req;
        console.log(entrega)
        //return(req);
        /*console.log(entrega)
        res.json(req.body);*/
        
        try {
            // Conectar a la base de datos
            const pool = await poolSQLServ_appdespacho;
            console.log('Conexión a la base de datos exitosa.');
            
            //sql = `execute app_Despacho.dbo.Grabar_DocumentoEntrega '60607894',1,@img, 7.886771,-72.496201,1,'flozano','appdespacho'`
            let sql = `execute app_Despacho.dbo.Grabar_DocumentoEntrega '${ entrega }',${ tipoDocumento },'${ imgBase64 }', ${ latitud },${ longitud },${ docConfirmado },'${ usuario }','appdespacho'`
            let result = await pool.query(sql);
            //res.json(result.recordset);
            return(result.recordset);
            
            // Cerrar la conexión, cerrar genera error, dejarla abierta
            //pool.close();
        } catch (err) {
            console.error('Error de conexión:', err);
        }
        /*json para ingreso al Body
            {
                "entrega":"60607894",
                "tipoDocumento":2,
                "imgBase64":'string base64', 
                "latitud":7.886771,, 
                "longitud":-72.496201, 
                "docConfirmado": 1, 
                "usuario": 'flozano'
              }
        */
    }
