import {AlistamientoAcumulado, GetEnteragaDetails, loginWm, RegistraPickingsService, Wm_confirm_ot, wm_Kpi_Alistamiento, wmGetOtOrder, wmLt22, zwmlt01} from '../../services/sap/wm.js'


 export  const  SessionWm = async ({usuario, contraseña, bandera})=>{
    const response   = await loginWm(usuario, contraseña, bandera);
    return response;

}

export  const  Kpi_Alistamiento = async (data)=>{
    const response   = await wm_Kpi_Alistamiento(data);
    return response;

}

export const  listOtwithOrder = async ({noentrega, tipoInfo})=>{
    const response = await wmGetOtOrder(noentrega,tipoInfo)
       return response;
}


export const  listLt22 = async ({alacenwm, tipoAlmacen})=>{
    
    let  ltap = await wmLt22(alacenwm, tipoAlmacen, "LTAP");
    let  body = await wmLt22(alacenwm, tipoAlmacen, "BODY");
    ltap.forEach(itemLtap => {
        let pallet = body.find(itemBody => itemBody.tanum === itemLtap.tanum);
        if (pallet) {
            itemLtap.consecutivo = pallet.consecutivo;
            itemLtap.usuario = pallet.usuario;
        }
    });
     return ltap;
}


export const Confirm_Ot = async ({entrega, ot, posicion}) =>{
    const response = await Wm_confirm_ot(entrega, ot, posicion)
       return response;

}

export const GetEntregaDetailWm = async (entrega) =>{
    const response = await GetEnteragaDetails(entrega)
       return response;

}

export const GetAlistamientoAcumulado = async (entrega,posOt,ot) =>{


       try {
        let response =  await AlistamientoAcumulado(entrega,posOt,ot)
      response[0].acumulado = response[0].acumulado.trim()
 
      
       if (!response || response.length === 0) {
         return {
           success: false,           
           data: null
         };
       }
   
       return {
         success: true,        
         data: response
       };
  
     } catch (error) {
       //console.error("Error en getInfoPlaca:", error);
       return {
         success: false,         
         error: error.message
       };
     
     }

}

export const getZwmLt01 = async ({ubicacionOrigen,almacen,ubicacionDestino,centro,cantidad,material,lote,pallet,bandera,loteDestino,usuario}) => {
  

    try {
      let response =  await zwmlt01(ubicacionOrigen,almacen,ubicacionDestino,centro,cantidad,material,lote,pallet,bandera,loteDestino,usuario)
  
    
     if (!response || response.length === 0) {
       return {
         success: false,           
         data: null
       };
     }
 
     return {
       success: true,        
       data: response
     };
    
  } catch (error) {
    return {
      success: false,         
      error: error.message
    };
  }
  
  
}


export const  registraPicking = async  ({entrega ,posicion ,material,lote,consestib,cantbuena,cantrotura,UMBASE ,usuario,bandera,IDX,POSOT,OT,TPLECTURA}) => {
  try {
    let response = await RegistraPickingsService(entrega ,posicion ,material,lote,consestib,cantbuena,cantrotura,UMBASE ,usuario,bandera,IDX,POSOT,OT,TPLECTURA);
    if (!response || response.length === 0) {
      return {
        success: false,           
        data: null
      };
    }
    return {
      success: true,        
      data: response
    };
  } catch (error) {
    return {
      success: false,         
      error: error.message
    };
  }
}