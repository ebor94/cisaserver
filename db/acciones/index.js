import sql from 'mssql'
import {config, configLilix} from '../config.js'

let pool;
async function getPool() {
    if (!pool) {
      pool = await new sql.ConnectionPool(configLilix).connect();
    }
    return pool;
  }

  export const actionsTextSave = async (codDestinatario,codTipoDoc,docNo,texto,accion,usuario) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('CodDestinatario', sql.VarChar, codDestinatario)
        .input('CodTipoDoc', sql.VarChar, codTipoDoc)
        .input('DocNo', sql.VarChar, docNo)
        .input('texto', sql.VarChar, texto)
        .input('accion', sql.VarChar, accion)
        .input('usuario', sql.VarChar, usuario)
        .execute('Grabar_Accion_TEXTO');
   
      return result.recordset;
    } catch (err) {
      console.error('Error en getEmpleadoDb:', err);
      throw err;
    }
  };

  export const Save_Action_Value = async (codDestinatario,codTipoDoc,docNo,txtvalor,accion,usuario,seleccion,observacion) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('CodDestinatario', sql.VarChar, codDestinatario)
        .input('CodTipoDoc', sql.VarChar, codTipoDoc)
        .input('DocNo', sql.VarChar, docNo)
        .input('txtvalor', sql.VarChar, txtvalor)
        .input('accion', sql.VarChar, accion)
        .input('usuario', sql.VarChar, usuario)
        .input('seleccion', sql.VarChar, seleccion)
        .input('observacion', sql.VarChar, observacion)
        .execute('Grabar_Accion_Valor');
      
      return result.recordset;
    } catch (err) {
      console.error('Error en Save_Action_Value:', err);
      throw err;
    }
  };
  export const Save_Action_Date = async (codDestinatario,codTipoDoc,docNo,fecha,accion,usuario,hora) => {
    console.log(codDestinatario,codTipoDoc,docNo,fecha,accion,usuario,hora)
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('CodDestinatario', sql.VarChar, codDestinatario)
        .input('CodTipoDoc', sql.VarChar, codTipoDoc)
        .input('DocNo', sql.VarChar, docNo)
        .input('fecha', sql.VarChar, fecha)
        .input('hora', sql.VarChar, hora)
        .input('accion', sql.VarChar, accion)
        .input('usuario', sql.VarChar, usuario)
        .execute('Grabar_Accion_Fecha');
      
      return result.recordset;
    } catch (err) {
      console.error('Error en Save_Action_Date:', err);
      throw err;
    }
  };

  export const Save_Action_Employee = async (codDestinatario,codTipoDoc,docNo,empleado,accion,usuario) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('CodDestinatario', sql.VarChar, codDestinatario)
        .input('CodTipoDoc', sql.VarChar, codTipoDoc)
        .input('DocNo', sql.VarChar, docNo)
        .input('empleado', sql.VarChar, empleado)
        .input('accion', sql.VarChar, accion)
        .input('usuario', sql.VarChar, usuario)
        .execute('Grabar_Accion_Empleado');
      
      return result.recordset;
    } catch (err) {
      console.error('Error en getEmpleadoDb:', err);
      throw err;
    }
  };

  export const Save_Action_List_Value = async (codDestinatario,codTipoDoc,docNo,opcion,accion,usuario) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('CodDestinatario', sql.VarChar, codDestinatario)
        .input('CodTipoDoc', sql.VarChar, codTipoDoc)
        .input('DocNo', sql.VarChar, docNo)
        .input('opcion', sql.VarChar, opcion)
        .input('accion', sql.VarChar, accion)
        .input('usuario', sql.VarChar, usuario)
        .execute('Grabar_Accion_Lista_Valor');
      
      return result.recordset;
    } catch (err) {
      console.error('Error en Grabar_Accion_Lista_Valor:', err);
      throw err;
    }
  };


  export const Save_Action_List_every_Value = async (codDestinatario,codTipoDoc,docNo,opcion,accion,usuario,insertar) => {
    try {
      const pool = await getPool();
      const result = await pool.request()
        .input('CodDestinatario', sql.VarChar, codDestinatario)
        .input('CodTipoDoc', sql.VarChar, codTipoDoc)
        .input('DocNo', sql.VarChar, docNo)
        .input('opcion', sql.VarChar, opcion)
        .input('accion', sql.VarChar, accion)
        .input('usuario', sql.VarChar, usuario)
        .input('insertar', sql.Int , insertar)
        .execute('Grabar_Accion_ListaMultiple_Valor');
      
      return result.recordset;
    } catch (err) {
      console.error('Error en Save_Action_List_every_Value:', err);
      throw err;
    }
  };

  export const List_actions = async (codDestinatario,codTipoDoc,ordNo, campoLibre4, campoLibre2) =>{
    try {
      const pool = await getPool();
      const result = await pool.request()
      .input('coddestinatario', sql.VarChar, codDestinatario)
      .input('cod_tipo_doc', sql.VarChar, codTipoDoc)
      .input('ord_no', sql.VarChar, ordNo)
      .input('campolibre4', sql.VarChar, campoLibre4)
      .input('campolibre2', sql.VarChar, campoLibre2)
      .execute('lista_acciones');
      return result.recordset;
      
    } catch (err) {
      console.error('Error en List_actions', err);
      throw err;
    }

  }




  // Función para cerrar la conexión cuando la aplicación se cierre
  export const closePool = async () => {
    if (pool) {
      await pool.close();
      pool = null;
    }
  };
  
  
  process.on('SIGINT', async () => {
      console.log('Closing database connections...');
      await closePool();
      process.exit(0);
    });