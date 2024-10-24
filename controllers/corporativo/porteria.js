import { actionsTextSave } from "../../db/acciones/index.js";
import { getFlujoIngreso, getInfoPlaca } from "../../db/corporativo/porteria.js"

export const getFlujo = (id) =>{
    const response  = getFlujoIngreso(id)

    return response;
}

export const getInfoPlacaEmpl = async (placa) =>{

    try {
        const response  = await getInfoPlaca(placa)
       
        if (!response || response.length === 0 || response[0].placa === "Rojo\t|Placa No registrada") {
          return {
            success: false,
            message: "No se encontró ningún vehiculo con esta placa",
            data: null
          };
        }
    
        return {
          success: true,
          message: "Vehiculo encontrado exitosamente",
          data: response
        };
  
      } catch (error) {
        //console.error("Error en getInfoPlaca:", error);
        return {
          success: false,
          message: "Ocurrió un error al buscar el vehiculo",
          error: error.message
        };
      
      }
}

export const recordPlateObservation = async (placa,observacion,usuario) => {
  try {
    let  response = await actionsTextSave('PO', 'PO', placa, observacion, 'PO002', usuario);
    if(!response || response.length === 0 ){
      return {
        success: false,
        message: "Ocurrió un error al buscar el vehiculo",
        error: null
      };
    }
    return {
      success: true,
      message: "Registro Exitoso",
      data: response
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Ocurrió un error al registrar la novedad",
      error: error.message
    };
  }
 
    
}

