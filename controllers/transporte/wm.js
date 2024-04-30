import {loginWm} from '../../services/sap/wm.js'


 export  const  SessionWm = async ({usuario, contraseña, bandera})=>{

    const response   = await loginWm(usuario, contraseña, bandera);

    return response;

}