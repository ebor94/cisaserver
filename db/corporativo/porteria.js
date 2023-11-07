import sql from 'mssql'
import {config} from '../config.js'

export const getFlujoIngreso = async (id) =>{
    // const idflujo =  sql.connect(config).then(pool => {   
    //     return pool.request()
    //          .input('id',sql.VarChar, tipo)        
    //        .execute('porteria_listarfujo')
    //     }).then(result => {
    //        // console.log(result)
    //         return result.recordset
    //     }).catch(err => {
    //         console.log(err)
    //         return err
    //     })

    const idflujo = "%7b5f9a89fb-db09-4f8b-8e2e-348a38d06eab%7d"
    
    return idflujo
}