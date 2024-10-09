import sql from 'mssql'
import {config} from '../config.js'

let pool;

async function getPool() {
  if (!pool) {
    pool = await new sql.ConnectionPool(config).connect();
  }
  return pool;
}

export const getEmpleadoDb = async (cedula) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('cedula', sql.VarChar, cedula)
      .execute('ConsultaInfEmpleado');
    
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