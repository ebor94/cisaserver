import sql from 'mssql'
import {configVselect, configMSSQLServ_appdespacho} from '../config.js'
//import {configMSSQLServ_appdespacho} from '../config.js'
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
          let response = result.recordset
          sql.close()   
          return response
       }).catch(err => {
           console.log(err)
           return err
       })
   
   return listaSalas
   
   }

   let poolx;

   async function getPool() {
     if (!poolx) {
       poolx = await new sql.ConnectionPool(configVselect).connect();
     }     
     return poolx;
   }   

export const listaEntregaUsuario = async(user)=>{

    try {
        const pool = await getPool();
        const result = await pool.request()
        .input('usuario', sql.VarChar, user)
        .execute('lista_Entrega_Usuario')        
        return result.recordset;
      } catch (err) {
        console.error('Error en listaEntregaUsuario:', err);
        throw err;
      }
 }

 export const IndicadorDespacho = async(PtoExp)=>{

  try {
      const pool = await getPool();
      const result = await pool.request()
      .input('PtoExp', sql.VarChar, PtoExp)
      .execute('IndicadorDespachoFechaActual')        
      return result.recordset;
    } catch (err) {
      console.error('Error en IndicadorDespacho:', err);
      throw err;
    }finally{
      await poolx.close();
      poolx = null;
      }
    
}

 // Función para cerrar la conexión cuando la aplicación se cierre
export const closePool = async () => {
    if (poolx) {
      await poolx.close();
      poolx = null;
    }
  };
  
  
  process.on('SIGINT', async () => {
      console.log('Closing database connections...');
      await closePool();
      process.exit(0);
    });


//------------------------------------------------------------------------------------------------------------------
// Funciones usadas en app_despacho
//------------------------------------------------------------------------------------------------------------------

/***
 * Consultar un despacho con sus entregas por cc de transportador
 * @param - cc
*/
//ejemplo consumo: http://localhost:3000/transporte/desp_transportador/19481059
//export const getDespTransportador_model =  async(req,res)=>{
export const DespTransportador_model = async(cc)=>{
    //console.log('en modelo', cc)
    
    const DespTransportador =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('TIPO', sql.VarChar, 'ENTREGAS_X_CC')
        .input('VALOR', sql.VarChar, cc)
        .execute('ConsultasTransportador')
        
      }) .then(result => {
        // console.log(result)
        let response = result.recordset
        sql.close()   
        return response

     }).catch(err => {
         console.log(err)
         return err
     })
     //
     return DespTransportador;
}   

/***
 * Consultar informacion general de un transportador
 * @param - cc
 */
export const InfoTransportador_model = async(cc)=>{
    //console.log('en modelo', cc)
    
    const infoTransportador =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('TIPO', sql.VarChar, 'TRANSPORTADOR_X_CC')
        .input('VALOR', sql.VarChar, cc)
        .execute('ConsultasTransportador')
      }) .then(result => {
        // console.log(result)
        let response = result.recordset
        sql.close()   
        return response
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
export const ValidarTransportador_model = async(cc,tel,placa)=>{
    //console.log('en modelo', cc)
    
    const infoTransportador =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('cedula', sql.VarChar, cc)
        .input('telefono', sql.VarChar, tel)
        .input('placavehiculo', sql.VarChar, placa)
        .execute('ValidarTransportador')
      }) .then(result => {
        // console.log(result)
        let response = result.recordset
        sql.close()   
        return response
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
export const InfoCliente_xEntrega_model = async(entrega)=>{
    //console.log('en modelo', cc)
    
    const infoClinte =  sql.connect(configVselect).then(pool => {
        return pool.request()
        .input('TIPO', sql.VarChar, 'CLIENTE_X_ENTREGA')
        .input('VALOR', sql.VarChar, entrega)
        .execute('ConsultasTransportador')
      }) .then(result => {
        // console.log(result)
        let response = result.recordset
        sql.close()   
        return response
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
    //console.log('en modelo', entrega)
    
    const docEntrega =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
        return pool.request()
        .input('ord_no', sql.VarChar, entrega)
        .execute('Consultar_documentoEntrega')
      }) .then(result => {
         //console.log('en result', result)
        let response = result.recordset
        sql.close()   
        return response
     }).catch(err => {
         //console.log(err)
         return err
     })
     return docEntrega;
}   

/**
 * Grabar los documentos (foto) en bd para confirmar la entrega
 * @param - entrega, tipoDocumento, imgBase64, latitude, longitude, docConfirmado, usuario
 * @param - de Salida: "resultado": "Registrado" o "resultado": "Actualizado"
 */
export const Grabar_documentoEntrega_model = async(req)=>{
    const {entrega, tipoDocumento, imgBase64, latitude, longitude, docConfirmado, usuario } = req;
    //console.log('en grabar: ',req)
    const docGrabado =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
        return pool.request()
        .input('ord_no', sql.VarChar, entrega)
        .input('CodTipoConfEntrega', sql.Int, tipoDocumento)
        .input('imagen', sql.VarChar, imgBase64)
        .input('latitude', sql.Decimal(9,6), latitude)
        .input('longitude', sql.Decimal(9,6), longitude)
        .input('documentoConfirmado', sql.Int, docConfirmado)
        .input('usuarioActualiza', sql.VarChar, usuario)
        .input('usuarioBD', sql.VarChar, 'appdespacho')
        .execute('Grabar_DocumentoEntrega')
      }) .then(result => {
        let response = result.recordset
        sql.close()   
        return response
     }).catch(err => {
         //console.log(err)
         return err
     })
         return docGrabado;

     /*json para ingreso al Body
            {
                "entrega":"60607894",
                "tipoDocumento":2,
                "imgBase64":'string base64', 
                "latitude":7.886771,, 
                "longitude":-72.496201, 
                "docConfirmado": 1, 
                "usuario": 'flozano'
              }
        */
}   

/**
 * Listar  Tipos de Novedad en Despacho
 * @param - de Entrada: 'vacio'
 * @param - de Salida: CodTipoNovedadDesp,	DesTipoNovedadDesp,	fechasis
 */
export const Lista_TiposNovedadDespacho_model = async()=>{
    
    const listTiposNov =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
        return pool.request()
        .execute('lista_TiposNovedadDespacho')
      }) .then(result => {
         //console.log('en result', result)
        let response = result.recordset
        sql.close()   
        return response
     }).catch(err => {
         //console.log(err)
         return err
     })
     return listTiposNov;
}   

/**
 * Grabar las novedades del despacho en tabla NovedadDespacho (inserta registro)  
  * @param - de entrada: despacho, CodTipoNovedadDesp, observacion, latitude, longitude, usuarioActualiza
 * @param - de Salida: "resultado": "Registrado", UltID insertado, Fecha, Hora
 */
export const Grabar_NovedadDespacho_model = async(data)=>{
    const {despacho, TipoNovedadDesp, entrega, observacion, latitude, longitude, usuario } = data;
    
    const docGrabado =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
        return pool.request()
        .input('orden_padre', sql.VarChar, despacho)
        .input('CodTipoNovedadDesp', sql.Int, TipoNovedadDesp)
        .input('ord_no', sql.VarChar, entrega)
        .input('observacion', sql.VarChar, observacion)
        .input('latitude', sql.Decimal(9,6), latitude)
        .input('longitude', sql.Decimal(9,6), longitude)
        .input('usuarioActualiza', sql.VarChar, usuario)
        .input('usuarioBD', sql.VarChar, 'appdespacho')
        .execute('Grabar_NovedadDespacho')
      }) .then(result => {
        let response = result.recordset
        sql.close()   
        return response
     }).catch(err => {
         console.log(err)
         return err
     })
    return docGrabado;

     /*json para ingreso al Body
        {
            "despacho":"136969",
            "TipoNovedadDesp":1,
            "entrega": "0",
            "observacion":'string varchar(100)', 
            "latitud":7.886771, 
            "longitud":-72.496201, 
            "usuario": 'flozano'
          }
    */
}   


/**
 * Grabar imagen de Novedad Despacho
 * @param - CodNovedadDesp, imgBase64, usuario
 * @param - de Salida: "resultado": "Registrado", fecha, hora  
 */
export const Grabar_ImagenNovedadDespacho_model = async(data)=>{
    const {CodNovedadDesp, imgBase64, usuario } = data;
    //console.log('en grabar: ',data)
    const docGrabado =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
        return pool.request()
        .input('CodNovedadDesp', sql.Int, CodNovedadDesp)
        .input('imagen', sql.VarChar, imgBase64)
        .input('usuarioActualiza', sql.VarChar, usuario)
        .input('usuarioBD', sql.VarChar, 'appdespacho')
        .execute('Grabar_ImagenNovedadDespacho')
      }) .then(result => {
        let response = result.recordset
        sql.close()   
        return response
     }).catch(err => {
         //console.log(err)
         return err
     })
         return docGrabado;

     /*json para ingreso al Body
        {
            "CodNovedadDesp":"9",
            "imgBase64":'string base64', 
            "usuario": 'flozano'
          }
    */
}   

/**
 * Grabar Localizacion Despacho para llevar el registro de localizacion de transporador por despacho
 * @param - despacho, latitude, longitude, fechaDispositivo,  usuario
 * @param - de Salida: "resultado": "Registrado", fecha, hora  
 */
export const Grabar_LocalizacionDespacho_model = async(data)=>{
    const {despacho, latitude, longitude, fechaDispositivo,  usuario } = data;
    //console.log('en grabar: ',data)
    const docGrabado =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
        return pool.request()
        .input('orden_padre', sql.VarChar, despacho)
        .input('latitude', sql.Decimal(9,6), latitude)
        .input('longitude', sql.Decimal(9,6), longitude)
        .input('fechaDispositivo', sql.VarChar, fechaDispositivo)
        .input('usuarioActualiza', sql.VarChar, usuario)
        .input('usuarioBD', sql.VarChar, 'appdespacho')
        .execute('Grabar_LocalizacionDespacho')
      }) .then(result => {
        let response = result.recordset
        sql.close()   
        return response
     }).catch(err => {
         //console.log(err)
         return err
     })
         return docGrabado;

     /*json para ingreso al Body
        {
        "despacho":"136969",
            "latitude": 7.886771,
            "longitude": -72.496201, 
            "fechaDispositivo":"2024-09-24 17:55:00",
            "usuario": "flozano"
          }
        */
}   

/**
 * consulta novedades del despacho por numero de despacho (por fkorden_padre)
 * @param - despacho: numero de despacho
 */
export const Lista_NovedadDespacho_xDespacho_model = async(desp)=>{
  //console.log('en modelo', desp)
  
  const listNovedades =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
      return pool.request()
      .input('TIPO', sql.VarChar, 'NOVEDADES_X_DESP')
      .input('VALOR', sql.VarChar, desp)
      .execute('Consultas_NovedadDespacho')
    }) .then(result => {
      // console.log(result)
      let response = result.recordset
      sql.close()   
      return response
   }).catch(err => {
       //console.log(err)
       return err
   })
   return listNovedades;
}   

/**
 * consulta novedades del despacho mas el detalle por numero de despacho (por fkorden_padre)
 * @param - despacho: numero de despacho
 */
export const Lista_NovedadDespachoDetalle_xDespacho_model = async(desp)=>{
  //console.log('en modelo', desp)
  
  const listNovedadesDet =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
      return pool.request()
      .input('TIPO', sql.VarChar, 'NOVEDADES_DETALLE_X_DESP')
      .input('VALOR', sql.VarChar, desp)
      .execute('Consultas_NovedadDespacho')
    }) .then(result => {
      // console.log(result)
      let response = result.recordset
      sql.close()   
      return response
   }).catch(err => {
       //console.log(err)
       return err
   })
   return listNovedadesDet;
}  

/**
 * consulta novedad y detalles de la novedad por codigo novedad_despacho (por CodNovedadDesp)
 * @param - codNovDespacho: codigo novedad despacho
 */
export const DetalleNovedad_xCodNovedad_model = async(codNovDespacho)=>{
  //console.log('en modelo', desp)
  
  const listDetNovedad =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
      return pool.request()
      .input('TIPO', sql.VarChar, 'DETALLE_NOVEDAD_X_CODNOVEDAD')
      .input('VALOR', sql.VarChar, codNovDespacho)
      .execute('Consultas_NovedadDespacho')
    }) .then(result => {
      // console.log(result)
      let response = result.recordset
      sql.close()   
      return response
   }).catch(err => {
       //console.log(err)
       return err
   })
   return listDetNovedad;
}  

/**
 * Consultar fecha del servidor
 * @param - formato: 'ANIO_MES_DIA_HORA_MIN_SEG' / 'ANIOMESDIA_HORAMINSEG'
 */
export const Consultar_fechaServer_model = async(formato)=>{
  //console.log(formato)  
  const fecha =  sql.connect(configMSSQLServ_appdespacho).then(pool => {
      return pool.request()
      .input('formato', sql.VarChar, formato)
      .execute('Consultas_Fecha')
    }) .then(result => {
      let response = result.recordset
      sql.close()   
      return response
   }).catch(err => {
       //console.log(err)
       return err
   })
       return fecha;
}   

/**
 * Actualizar estado de la entrega
 * @param - anio,mes,dia,hora -> obligatorios
 * @param - estado,comportamiento,observaciones -> se pueden dejar en ""
 */
export const Actualizar_EstadoEntrega_model = async(data)=>{
  const {entrega,anio,mes,dia,hora,estado,comportamiento,observaciones,devolver_valores } = data;
  console.log(data) 
  const EntregaActualizada =  sql.connect(configVselect).then(pool => {
    return pool.request()
      .input('ORD_NO', sql.VarChar, entrega)
      .input('ANO', sql.VarChar, anio)
      .input('MES', sql.VarChar, mes)
      .input('DIA', sql.VarChar, dia)
      .input('HORA', sql.VarChar, hora)
      .input('ESTADO', sql.VarChar, estado)
      .input('COMPORTAMIENTO', sql.VarChar, comportamiento)
      .input('OBSERVACIONES', sql.VarChar, observaciones)
      .input('devolver_valores', sql.VarChar, devolver_valores)
      .execute('TTE_GRABA_INF_PEDIDO')
    }) .then(result => {
      let response = result.recordset
      sql.close()   
      return response
    }).catch(err => {
       //console.log(err)
       return err
    })
    return EntregaActualizada;

   /*
   url: http://localhost:3001/transporte/actualizar_estadoentrega
   json para ingreso al Body
      {
      "entrega":"60617193",
      "anio": "2024",
      "mes": "10", 
      "dia":"26",
      "hora": "9",
      "estado": "",
      "comportamiento": "",
      "observaciones": ""
      }
      */
}   
