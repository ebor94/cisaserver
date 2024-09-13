import sql from 'mssql'
import {config} from '../config.js'

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