import {GetFTecnica} from "../../db/clientes/fichaTecnica.js"
import { GetInventory } from "../clientes/inventario.js"
import {GetDataSheetSap, GetProductText} from "../../services/sap/fichatecnica.js"

export const GetFichaTecnica = (data) => {
    let codsap = data;
    let response  = GetFTecnica(codsap);
return response;

}

export const  getDataSheetSap = async(data)=>{
    let dataprod = {
        "BUSQUEDA" : data,
        "DTLUBICA" : "W",
        "PARCENTRO" : "",
        "PARALMACEN" : "",
        "PARORGVTA" : "",
        "PARACANAL" : ""
    }
    let  texto =  await GetProductText(data,'S','GRUN','MATERIAL')
    let  solotexto =  texto[0].field2    
    let  infoproduct =  await GetInventory(dataprod)
    let  productName = infoproduct[0].descripcion
    let response =  await GetDataSheetSap(data)
    let InfProduct = [{caracteristica: 'Name', valor: productName}]
    let arrayfichatecnica = []
    console.log(InfProduct)
   
    if (typeof solotexto !== 'undefined'){
        let cadena = JSON.stringify(solotexto).replace(/\\n\//g, "");
        let textjson = JSON.parse(cadena); 
        let objeto = JSON.parse(textjson);
        arrayfichatecnica = [...objeto, ...response, ...InfProduct];     
        return  arrayfichatecnica
        
    }else{
        arrayfichatecnica = [ ...response, ...InfProduct];  
        return  arrayfichatecnica 

    }
}