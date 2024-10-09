import { getEmpleadoDb, closePool } from "../../db/corporativo/empleados.js";




export const GetEmpleado = async (cc) => {
    try {
      const response = await getEmpleadoDb(cc);
      await closePool(); 
      if (!response || response.length === 0) {
        return {
          success: false,
          message: "No se encontró ningún empleado con esa cédula",
          data: null
        };
      }
  
      return {
        success: true,
        message: "Empleado encontrado exitosamente",
        data: response
      };

    } catch (error) {
      console.error("Error en GetEmpleado:", error);
      return {
        success: false,
        message: "Ocurrió un error al buscar el empleado",
        error: error.message
      };
    
    }

  }