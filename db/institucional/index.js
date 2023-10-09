import sql from 'mssql'

import {config} from '../config.js'

export const horarioListarSalas = async (data)=>{

 const listaSalas =  sql.connect(config).then(pool => {   
    return pool.request()
       .input('marca', sql.VarChar, data)
       .execute('horariolistarsalas')
    }).then(result => {
        //console.log(result.recordset)
        return result.recordset
    }).catch(err => {
        console.log(err)
        return err
    })

return listaSalas

}

export const horariomostrardisponible =  async(sala, fecha) =>{

    const horariosDisponible =  sql.connect(config).then(pool => {   
      
        return pool.request()
           .input('sala', sql.VarChar, sala)
           .input('fecha', sql.DateTime, fecha)
           .execute('horariomostrardisponible')
        }).then(result => {
           // console.log(result.recordset)
            return result.recordset
        }).catch(err => {
            console.log(err)
            return err
        })
    
    return horariosDisponible
}

export const horarioRegistrarTurno =  async(data) =>{
    let IdSala	     = data.IdSala	
    let fecha	     = data.fecha	
    let ItemCode     = data.ItemCode	
    let mail	     = data.mail	
    let Nombres	     = data.Nombres	
    let Apellidos	 = data.Apellidos	
    let telefono	 = data.telefono	
    let ownerperson	 = data.ownerperson	
    let latitud      = data.latitud 
    let longitud     = data.longitud 
    let observacion  = data.observacion 
    let TipoVisita   = data.TipoVisita 
    let drive        = data.drive 

    const RegistrarTurno =  sql.connect(config).then(pool => {   
      
        return pool.request()
           .input('IdSala', sql.VarChar, IdSala)
           .input('fecha', sql.Date, fecha)
           .input('ItemCode', sql.VarChar, ItemCode)
           .input('mail', sql.VarChar, mail)
           .input('Nombres', sql.VarChar, Nombres)
           .input('Apellidos', sql.VarChar, Apellidos)
           .input('ownerperson', sql.Int, ownerperson)
           .input('latitud', sql.VarChar, latitud)
           .input('longitud', sql.VarChar, longitud)
           .input('observacion', sql.VarChar, observacion)
           .input('TipoVisita', sql.VarChar, TipoVisita)
           .input('drive', sql.VarChar, drive)
           .input('telefono', sql.VarChar, telefono)
          .execute('HorarioRegistrarTurno')
        }).then(result => {
           // console.log(result.recordset)
            return result.recordset
        }).catch(err => {
            console.log(err)
            return err
        })
    
    return RegistrarTurno

    
}