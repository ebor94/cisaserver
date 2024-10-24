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