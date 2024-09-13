import {loginWm, wm_Kpi_Alistamiento, wmGetOtOrder} from '../../services/sap/wm.js'


 export  const  SessionWm = async ({usuario, contraseña, bandera})=>{
    const response   = await loginWm(usuario, contraseña, bandera);
    return response;

}

export  const  Kpi_Alistamiento = async (data)=>{
    const response   = await wm_Kpi_Alistamiento(data);
    return response;

}

export const  listOtwithOrder = async ({noentrega, tipoInfo})=>{
    const response = await wmGetOtOrder(noentrega,tipoInfo)
       return response;
}