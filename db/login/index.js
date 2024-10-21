import sql from 'mssql'

import {configBot, configLilix} from '../config.js'

export const logAccesos = async (usuario, app)=>{

 const saveChat = sql.connect(configBot).then(pool => {   
    return pool.request()
        .input('pregunta', sql.VarChar, app)
        .input('respuesta', sql.VarChar, '')
        .input('usuario', sql.VarChar, usuario)
          .execute('italbotSaveChat')
    }).then(result => {
        console.log(result.recordset[0].msj)
        let response = result.recordset[0].msj
        sql.close()   
        return response
       
    }).catch(err => {
        console.log(err)
        return err
    })

if (saveChat == "REGISTRO EXITOSO"){
    return true
}else{
    return false
}

}


let pool;

async function getPool() {
  if (!pool) {
    pool = await new sql.ConnectionPool(configLilix).connect();
  }
  return pool;
}

export const getInfoPlaca = async (placa,) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('placa', sql.VarChar, placa)
      .input('usuario', sql.VarChar, '')
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

