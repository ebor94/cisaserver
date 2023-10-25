import {getProducts, UpdateStock, UpdateStockCisa} from  '../../db/usa/index.js'
export const  GetIdProductsUsa = async () =>{
    const productList = await  getProducts();
    return  productList;
}

export const updateStock = async (data) =>{
  let res = [];
   const {id, quantity, reference} = data
   const  response  =  await UpdateStock(id, quantity, reference);
   const responsecisa = await UpdateStockCisa(reference, quantity)
   res.push(response)
   res.push(responsecisa)
   return res;

}