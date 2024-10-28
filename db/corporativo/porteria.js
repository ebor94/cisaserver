import sql from 'mssql'
import {config, configLilix} from '../config.js'

export const getFlujoIngreso = async (id) =>{
    const idflujo =  sql.connect(config).then(pool => {   
        return pool.request()
             .input('id',sql.VarChar, id) 
             //.input('tipo',sql.VarChar, tipo) 
           .execute('porteria_listarfujo')
        }).then(result => {
            let response = result.recordset
        sql.close()   
        return response
        }).catch(err => {
            console.log(err)
            return err
        })
    return idflujo
}


let pool;

async function getPool() {
  if (!pool) {
    pool = await new sql.ConnectionPool(configLilix).connect();
  }
  return pool;
}

export const getInfoPlaca = async (placa,user) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('placa', sql.VarChar, placa)
      .input('usuario', sql.VarChar, user)
      .execute('ContralIngresovehiculos');
    
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