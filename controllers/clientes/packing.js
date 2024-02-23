import {GetPacking} from '../../services/sap/packing.js'

export const GetPackingList = (data) => {
    let codsap = data;
    let response  = GetPacking(codsap);
return response;
}
