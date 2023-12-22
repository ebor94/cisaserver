import sql from 'mssql'
import {config} from '../config.js'

export const getFlujoIngreso = async (id) =>{
    const idflujo =  sql.connect(config).then(pool => {   
        return pool.request()
             .input('id',sql.VarChar, id) 
             //.input('tipo',sql.VarChar, tipo) 
           .execute('porteria_listarfujo')
        }).then(result => {
            console.log(result)
            return result.recordset
        }).catch(err => {
            console.log(err)
            return err
        })

  
    
    return idflujo
}