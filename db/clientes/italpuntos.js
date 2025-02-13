import { configLilix } from "../config.js";
import sql from 'mssql'
/**
clave,
codigo,
empresa,
fechaExpiracionTicket,
hashPdf,
nombreEmpresa,
status,
url,
userCode,
valor,
 */
export const saveGiftCardBought = async ( clave, codTarjeta,empresa,fechaExpiracionTicket,hashPdf,idGiftcard,nombreEmpresa,status,url,userCode,valor,bandera,codigo) => {  
    let pool = null;
    try {  
      // Establecer conexión  
      pool = await sql.connect(configLilix);  
    
      // Ejecutar procedimiento almacenado  
      const result = await pool.request()  
        .input('clave', sql.VarChar, clave)  
        .input('codTarjeta', sql.VarChar, codTarjeta)  
        .input('empresa', sql.VarChar, empresa)  
        .input('fechaExpiracionTicket', sql.VarChar, fechaExpiracionTicket)  
        .input('hashPdf', sql.VarChar, hashPdf)  
        .input('idGiftcard', sql.VarChar, idGiftcard) 
        .input('nombreEmpresa', sql.VarChar, nombreEmpresa)  
        .input('status', sql.VarChar, status)  
        .input('url', sql.VarChar, url)  
        .input('userCode', sql.VarChar, userCode)  
        .input('valor', sql.Int, valor)  
        .input('Aux', sql.VarChar, bandera)  
        .input('codigo', sql.VarChar, codigo) 
        .execute('SPItalpuntosRegistarRedencion');  
    
      return {  
        success: true,  
        data: result.recordset,  
        message: 'Operación exitosa'  
      };  
    
    } catch (error) {  
      console.error('Error en saveGiftCardBought:', error);  
      return {  
        success: false,  
        data: null,  
        message: error.message || 'Error al procesar la solicitud'  
      };  
    
    } finally {  
      // Cerrar la conexión en el bloque finally para asegurar que siempre se ejecute  
      if (pool) {  
        try {  
          await pool.close();  
          //console.log('Conexión cerrada exitosamente');  
        } catch (error) {  
          //console.error('Error al cerrar la conexión:', error);  
        }  
      }  
    }  
  };