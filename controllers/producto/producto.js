import { GetRotura } from '../../services/sap/inventario.js';
import { GetName } from '../../services/sap/product.js';
import {GetPrice, infoPallet, SamplePortfolio} from '../../services/sap/product.js'


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