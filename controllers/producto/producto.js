import {GetPrice} from '../../services/sap/product.js'


export const GetPorductPrice = async (data) =>{
    let priceList = await GetPrice(data);

    return priceList;


}