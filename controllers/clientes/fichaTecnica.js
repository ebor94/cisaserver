import {GetFTecnica} from "../../db/clientes/fichaTecnica.js"
import { GetInventory } from "../clientes/inventario.js"
import {GetDataSheetSap, GetProductText} from "../../services/sap/fichatecnica.js"
import {GetName} from "../../services/sap/product.js"
import { SearchFileDrive } from "../../services/Gpc/fichatecnica.js"


export const GetFichaTecnica = (data) => {
    let codsap = data;
    let response  = GetFTecnica(codsap);
return response;

}

export const  getDataSheetSap = async(data,lang)=>{
    // let dataprod = {
    //     "BUSQUEDA" : data,
    //     "DTLUBICA" : "W",
    //     "PARCENTRO" : "",
    //     "PARALMACEN" : "",
    //     "PARORGVTA" : "",
    //     "PARACANAL" : ""
    // }
    let  texto =  await GetProductText(data,lang,'GRUN','MATERIAL')
    let  solotexto =  texto[0].field2    
   // let  infoproduct =  await GetInventory(dataprod)
    let  infoproduct2 =  await GetName(data,lang)   
    let  productName = infoproduct2[0].eMaktx
    let response =  await GetDataSheetSap(data, lang)
    let InfProduct = [{caracteristica: 'NAME', valor: productName, idCaracteristica: 'NAME'}]
    let arrayfichatecnica = []
    //console.log(infoproduct2)
   
    if (typeof solotexto !== 'undefined'){
        let cadena = JSON.stringify(solotexto).replace(/\\n\//g, "");
        let textjson = JSON.parse(cadena); 
        let objeto = JSON.parse(textjson);
        objeto[0].idCaracteristica = 'Statement'
        objeto[1].idCaracteristica = 'AreaInstalacion'
       // console.log(objeto)
        arrayfichatecnica = [...objeto, ...response, ...InfProduct];     
        return  arrayfichatecnica
        
    }else{
        arrayfichatecnica = [ ...response, ...InfProduct];  
        return  arrayfichatecnica 

    }
}

export const GetDataSheetDrive = async(data)=>{
    
    try {
       const resp = await SearchFileDrive(data)
       return resp
    } catch (error) {
        throw error
    }


}