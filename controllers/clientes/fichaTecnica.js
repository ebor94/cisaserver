import {GetFTecnica} from "../../db/clientes/fichaTecnica.js"

export const GetFichaTecnica = (data) => {
    let codsap = data;
    let response  = GetFTecnica(codsap);
return response;
}