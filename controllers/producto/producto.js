import { GetRotura } from '../../services/sap/inventario.js';
import {GetPrice, SamplePortfolio} from '../../services/sap/product.js'


export const GetPorductPrice = async (data) =>{
    let priceList = await GetPrice(data);

    return priceList;


}

export const GetSamples = async(data) =>{
    let sampleList = await SamplePortfolio(data);
    return sampleList;

}

export const GetRoturaController = async({centro, mov1, mov2, fechaini, fechafi}) =>{
    let indicadorRotura = await GetRotura(centro, mov1, mov2, fechaini, fechafi);
    return indicadorRotura;
}