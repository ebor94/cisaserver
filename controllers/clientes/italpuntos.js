import { cuponList } from "../../services/appPrecio"


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