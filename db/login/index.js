import sql from 'mssql'

import {configBot} from '../config.js'

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