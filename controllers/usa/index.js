import {GetProductsIdUsa} from  '../../services/usa/index.js'
export const  GetIdProductsUsa = async () =>{
    const productList = await  GetProductsIdUsa();
    let product=[];
    productList.forEach(function(item) {            
        product.push(item.attributes.id)
      });
    return  product;
}