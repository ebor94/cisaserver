import {getInventory} from "../../services/sap/inventario.js"

export const GetInventory = (data) => {
   let BUSQUEDA = data.BUSQUEDA;
   let DTLUBICA = data.DTLUBICA;
   let PARCENTRO = data.PARCENTRO;
   let PARALMACEN = data.PARALMACEN;
   let PARORGVTA = data.PARORGVTA;
   let PARACANAL  = data.PARACANAL;
let response  = getInventory(BUSQUEDA,DTLUBICA,PARCENTRO,PARALMACEN,PARORGVTA, PARACANAL);
return response;
}