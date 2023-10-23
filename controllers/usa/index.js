import {GetProductsListUsa} from  '../../services/usa/index.js'
export const  GetProductsUsa = () =>{
    const productList =  GetProductsListUsa();
    return  productList;
}