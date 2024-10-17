import { getFlujoIngreso, getInfoPlaca } from "../../db/corporativo/porteria.js"

export const getFlujo = (id) =>{
    const response  = getFlujoIngreso(id)

    return response;
}

export const getInfoPlacaEmpl = async (placa) =>{

    try {
        const response  = await getInfoPlaca(placa)
       
        if (!response || response.length === 0) {
          return {
            success: false,
            message: "No se encontró ningún empleado con esa cédula",
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

