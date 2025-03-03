import { generateToken } from '../../services/jwt/index.js';
import { GetName } from '../../services/sap/product.js';
import {AlistamientoAcumulado, GetEnteragaDetails, GetWeightDelivery, loginWm, mt, RegistraPickingsService, Wm_confirm_ot, wm_Kpi_Alistamiento, wmGetOtOrder, wmLt22, zwmlt01} from '../../services/sap/wm.js'


 export  const  SessionWm = async ({usuario, contraseña, bandera})=>{
    try {
        let response =  await loginWm(usuario, contraseña, bandera)
        if (!response || response.length === 0  || response[0].nombre === '') {
          return {
            success: false,           
            data: null
          };
        }
        return {          
          success: true,        
          data: response,
          token: generateToken(response[0].nombre),
        };
      }
      catch (error) {
        return {
          success: false,         
          error: error.message
        };
      }

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
      
       if(bandera == '6' || bandera == '10'){
        const updatedResponse = {
          mensaje: response.mensaje,
          ots: response.ots,
          totalubica: response.totalubica,
          disponibleubica: response.disponibleubica,
          datos: await Promise.all(
            response.datos
              .filter(item => item.matnr > 1)
              .map(async (item) => {
                const [nameData] = await GetName(item.matnr, 'S')
                return {
                  ...item,
                  name: nameData.eMaktx
                }
              })
          )
        }
        
        response = updatedResponse
    }
     
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

export const WeightDelivery = async (entrega) => {
  try {
    let response = await GetWeightDelivery(entrega)
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


export const getInfoMt = async (entrega, centro) => {
  try {
    let response = await mt.getInfoMT(entrega, centro)
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

export const registrarIngresoMt = async(data) => {

  try {
    const requiredFields = ['VBELN', 'MATNR', 'CHARG', 'CENTRO_ING', 'LGORT', 'POS_ENTREGA', 'CANTIDAD'];  
    const missingFields = requiredFields.filter((field) => !data[field] || (field === 'CANTIDAD' && parseFloat(data[field]) <= 0));  
    
    if (missingFields.length > 0) {  
      return {  
        success: false,  
        error: `Los siguientes campos son inválidos o están vacíos: ${missingFields.join(', ')}`,  
      };  
    }
    let token = await mt.GetToken(data)
    
    let response = await mt.registrarIngreso(data, token)
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

export const getInfoIngresoMt = async (consecutivo,estado, centro, almacen, entrega) => {
  try {
    let response = await mt.getInfoIngreso(consecutivo,estado, centro, almacen, entrega);
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