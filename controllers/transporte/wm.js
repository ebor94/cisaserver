import {loginWm, wm_Kpi_Alistamiento} from '../../services/sap/wm.js'


 export  const  SessionWm = async ({usuario, contraseña, bandera})=>{
    const response   = await loginWm(usuario, contraseña, bandera);
    return response;

}

export  const  Kpi_Alistamiento = async (data)=>{
    const response   = await wm_Kpi_Alistamiento(data);
    return response;

}