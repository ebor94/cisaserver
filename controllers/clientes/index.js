
import { Cliente } from "../../services/sap/clientes.js";
export const GetCliente = async (cc)=>{
    try {
        const response = await Cliente.getinfo(cc);
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