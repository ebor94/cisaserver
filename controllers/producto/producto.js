import { GetRotura } from '../../services/sap/inventario.js';
import { GetName } from '../../services/sap/product.js';
import {GetPrice, infoPallet, SamplePortfolio} from '../../services/sap/product.js'
import {Product } from '../../services/sap/product.js'


export const GetPorductPrice = async (data) =>{
    let priceList = await GetPrice(data);

    return priceList;


}

export const GetSamples = async(data) =>{
    let sampleList = await SamplePortfolio(data);
    return sampleList;

}

export const GetRoturaController = async(centro,mov1,mov2,fechaini,fechafin,bandera) =>{
    let indicadorRotura = await GetRotura(centro, mov1, mov2, fechaini, fechafin,bandera);
    for (const material of indicadorRotura) {
      const { matnr } = material;
      if (matnr) {
        try {
          const [nameData] = await GetName(matnr, 'S')

          material.nombre = nameData.eMaktx;
        } catch (error) {
          console.error(`Error al obtener el nombre del material ${matnr}:`, error);
        }
      }
    
}

return indicadorRotura;

}

export const getInfoPallet = async(pallet,lote,material)=>{
    try {        
        let response = await infoPallet(pallet,lote,material);
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

export const infoEtiqueta = async (pallet) => {  
  // Validación del parámetro pallet  
  if (!pallet) {  
    return {  
      success: false,  
      status: 400,  
      message: 'El número de pallet es requerido',  
      data: null  
    };  
  }  
  
  // Validar formato del pallet (asumiendo que debe ser numérico y de 10 dígitos)  
  if (!/^\d{10}$/.test(pallet)) {  
    return {  
      success: false,  
      status: 400,  
      message: 'Formato de pallet inválido. Debe ser numérico de 10 dígitos',  
      data: null  
    };  
  }  
  
  try {  
    const response = await Product.Etiqueta(pallet);  
  
    // Validar si la respuesta tiene la estructura esperada  
    if (!response?.d?.results) {  
      return {  
        success: false,  
        status: 404,  
        message: 'No se encontraron datos para el pallet especificado',  
        data: null  
      };  
    }  
  
    // Validar si hay resultados  
    if (response.d.results.length === 0) {  
      return {  
        success: false,  
        status: 404,  
        message: `No se encontró información para el pallet ${pallet}`,  
        data: null  
      };  
    }  
  
    // Transformar/mapear los datos si es necesario  
    const etiquetaData = response.d.results.map(item => ({  
      ubicacion: item.UBICACION,  
      cantidad: parseFloat(item.CANTIDAD),  
      lote: item.LOTE,  
      codigoSap: item.CODSAP,  
      pallet: item.PALLET,  
      material: item.MATERIAL  
    }));  
  
    return {  
      success: true,  
      status: 200,  
      message: 'Información de etiqueta recuperada exitosamente',  
      data: etiquetaData  
    };  
  
  } catch (error) {  
    // Manejar diferentes tipos de errores  
    if (error.response) {  
      // Error de respuesta del servidor  
      return {  
        success: false,  
        status: error.response.status,  
        message: `Error del servidor: ${error.response.data?.message || 'Error desconocido'}`,  
        error: error.response.data  
      };  
    } else if (error.request) {  
      // Error de red  
      return {  
        success: false,  
        status: 503,  
        message: 'Error de conexión con el servidor SAP',  
        error: error.message  
      };  
    } else {  
      // Otros errores  
      return {  
        success: false,  
        status: 500,  
        message: 'Error interno del servidor',  
        error: error.message  
      };  
    }  
  }  
};