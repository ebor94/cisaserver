import {loginWm, Wm_confirm_ot, wm_Kpi_Alistamiento, wmGetOtOrder, wmLt22} from '../../services/sap/wm.js'


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


export const  listLt22 = async ({alacenwm, tipoAlmacen})=>{
    
    let  ltap = await wmLt22(alacenwm, tipoAlmacen, "LTAP");
    let  body = await wmLt22(alacenwm, tipoAlmacen, "BODY");
    ltap.forEach(itemLtap => {
        let pallet = body.find(itemBody => itemBody.tanum === itemLtap.tanum);
        if (pallet) {
            itemLtap.consecutivo = pallet.consecutivo;
            itemLtap.usuario = pallet.usuario;
        }
    });
     return ltap;
}


export const Confirm_Ot = async ({entrega, ot, posicion}) =>{
    const response = await Wm_confirm_ot(entrega, ot, posicion)
       return response;

}

