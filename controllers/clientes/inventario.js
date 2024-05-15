import { getInventory } from "../../services/sap/inventario.js"
import { GetFichaTecnica } from "../../controllers/clientes/fichaTecnica.js";
import { GetFichaTecnicaHawa } from "../../services/files/FichasTecnicasHawa.js";

export const GetInventory = (data) => {
   const BUSQUEDA = data.BUSQUEDA;
   const DTLUBICA = data.DTLUBICA;
   const PARCENTRO = data.PARCENTRO;
   const PARALMACEN = data.PARALMACEN;
   const PARORGVTA = data.PARORGVTA;
   const PARACANAL = data.PARACANAL;

   const response = getInventory(BUSQUEDA, DTLUBICA, PARCENTRO, PARALMACEN, PARORGVTA, PARACANAL).then(async (producto) => {
      let datares = [];
      for (const product of producto) {

         if (product.tipomaterial == 'YRVS' || product.tipomaterial == 'YCRS') {
            product.fichatecnica = null;    
         }
         // if (product.tipomaterial == 'YRVP' || product.tipomaterial == 'YCRP' || product.tipomaterial == 'YRVR') {
         //    let estatusFt = await ValidaFtRv(product.material);
         //    if (estatusFt == false) {
         //       product.fichatecnica = null;    
         //    }
         // }
         if (product.tipomaterial == 'HAWA') {
            const status = await validahawa(product)
            if(status == false){
               product.fichatecnica = null;    
            }
            
         }
         datares.push(product)
      }

      return datares;

   });
   return response;
}

const ValidaFtRv = async (codsap) => {
   let QuantRows = await GetFichaTecnica(codsap);
   if (QuantRows.length > 3) {
      return true;
   } else {
      return false;
   }

}

async function validahawa(producto) {
   return GetFichaTecnicaHawa(producto.material).then((datos) => {
      return datos;
   })
      .catch((error) => {
         console.error('Error al obtener datos:', error);
         throw error;
      });
}





































































































































































































































































