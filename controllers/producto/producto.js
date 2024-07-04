import {GetPrice, SamplePortfolio} from '../../services/sap/product.js'


export const GetPorductPrice = async (data) =>{
    let priceList = await GetPrice(data);

    return priceList;


}

export const GetSamples = async(data) =>{
    let sampleList = await SamplePortfolio(data);
    return sampleList;

}