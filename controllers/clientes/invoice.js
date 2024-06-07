import {GetInvoice, GetInfoSeller, GetHeadQuote, CreateOrderReference} from "../../services/sap/invoice.js"
import {GetPrice} from '../../services/sap/product.js'



export   const GetInvoiceController = async (data) =>{
    let cte =  data.cte;    
    let invoice = await GetInvoice( data.LCODIGO, data.LTIPO, data.TPROCESO, data.PCODSOLICITANTE, data.PHANDLE, data.FECHAINI, data.FECHAFIN);  
     //console.log(cte,"---",invoice[0].solici)
     let dataGetPrice = {
        "KUNNR":"1093771589",
        "MATNR":"",
        "WERKS":"1100",
        "LVTWEG":"60",
        "VKBUR":"110",
        "PRDESC":"ZYD1",
        "VKORG":"1000",
        "CANTI":"",
        "UMVTA":"",
        "FLAX":"Y",
        "FECHA":"",
        "MOTIVOP":"",
        "MATNR_CHILD":""
                }
        const results = []; 
        
        for (const item of invoice) {
            dataGetPrice.MATNR = "000000000000"+item.materi
           // console.log(dataGetPrice)
            const result = await GetPrice(dataGetPrice); 
           // console.log(result)
            item.pvp = result[0].prcted
            results.push(item);
          }

    if(cte === results[0].solici){
        console.log(cte,"******",invoice[0].solici)
        
        let infSeller = await GetInfoSeller("TELV_"+results[0].vended)
        results[0].telfvend = infSeller[0].valor;    
        console.log(cte,"******", results[0].telfvend)     
        return results ;
    }else{
        return []
    }

}


export const GetQuoteHead = async (data) =>{

    let quoteHead =  await GetHeadQuote(data);
    return  quoteHead;
}


export const PostOrderReference = async(data)=>{
    let parametros =  JSON.stringify(data);
    let order =  await CreateOrderReference(parametros);
    return order ;


}