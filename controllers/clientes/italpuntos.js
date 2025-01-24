import { cuponList } from "../../services/appPrecio/index.js"
import { Cliente } from "../../services/sap/clientes.js";



export const  getCuponList = async  () => {
    try {
        const response = await cuponList();
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