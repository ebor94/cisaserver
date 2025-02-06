import { cuponList } from "../../services/appPrecio/index.js"




export const  getCuponList = async  () => {
    try {
        const response = await cuponList.getCupon();
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

export const  getGiftCard = async  (id) => {
  try {
      const response = await cuponList.getGiftCard(id);
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

