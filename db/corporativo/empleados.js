import sql from 'mssql'
import {config} from '../config.js'

export const getEmpleadoDb = async (cedula) =>{
    const empleado =  sql.connect(config).then(pool => {   
        return pool.request()
             .input('cedula',sql.VarChar, cedula) 
             //.input('tipo',sql.VarChar, tipo) 
           .execute('ConsultaInfEmpleado ')
        }).then(result => {
            let response = result.recordset
        sql.close()   
        return response
        }).catch(err => {
            console.log(err)
            return err
        })
    return empleado
}