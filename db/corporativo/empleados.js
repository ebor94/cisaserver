import sql from 'mssql'
import {config} from '../config.js'

export const getEmpleadoDb = async (cedula) =>{
    const empleado =  await sql.connect(config).then(pool => {   
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
            sql.close()  
            return err
        })
    return empleado
}