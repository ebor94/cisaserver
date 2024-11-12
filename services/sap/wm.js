import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const sapDomain = "https://itaprd.ceramicaitalia.com:44301/sap/bc/rest/"

export const loginWm = (usuario, contraseña, bandera) => {
    let data = JSON.stringify({
        "IUSUARIO": usuario,
        "IPASSWORD": contraseña,
        "IBANDERA" : bandera
            });
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.SESSIONWM_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : data
        };   
        
    const response =   axios.request(config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return JSON.stringify(error);
    });

    return response;    
}


export const wm_Kpi_Alistamiento = (data) =>{


    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.KPI_ALISTAMIENTO_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : data
        };   
        
    const response =   axios.request(config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return JSON.stringify(error);
    });

    return response;    

}

export const wmGetOtOrder = (entrega, tipoInfo)=>{

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.OT_ENTREGA_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : {
            "NOENTREGA" : entrega,
            "TIPOINFO": tipoInfo
        }

        };   
        
    const response =   axios.request(config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return JSON.stringify(error);
    });

    return response;  
    
}

export const wmLt22 = (alacenwm, tipoAlmacen, tablaMostrar)=>{

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.LT22_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : {
            "I_LGNUM": alacenwm,
            "I_VLTYP": tipoAlmacen,
            "TABLE_NAME": tablaMostrar
            }

        };   
        
    const response =   axios.request(config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return JSON.stringify(error);
    });

    return response;  
    
}


export const Wm_confirm_ot = (entrega, ot, posicion)=>{

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.CONFIRM_OT_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : {
            "vbeln" : entrega,
            "tanum" : ot,
            "TAPOS" : posicion
            }

        };   
        
    const response =   axios.request(config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return JSON.stringify(error);
    });

    return response;  
    
}

export const GetEnteragaDetails = (entrega) =>{  
   
    let config = {
  
        method: 'get',
        maxBodyLength: Infinity,
        url: `${sapDomain}z_alistamiento?sap-client=310&ord=${entrega}`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
      };
      
      const response =   axios.request(config)
      .then((response) => {
          return response.data;
      })
      .catch((error) => {
          return JSON.stringify(error);
      });
  
      return response; 

}
export const AlistamientoAcumulado = (entrega, posot, ot) =>{  
   
    let config = {
        
        method: 'get',
        maxBodyLength: Infinity,
        url: `${sapDomain}zws_alistacum?sap-client=310&ord=${entrega}&posot=${posot}&ot=${ot}`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
      };
      
      const response =   axios.request(config)
      .then((response) => {
          return response.data;
      })
      .catch((error) => {
          return JSON.stringify(error);
      });
  
      return response; 

}

export const zwmlt01 = (ubicacionOrigen,almacen,ubicacionDestino,centro,cantidad,material,lote,pallet,bandera,loteDestino,usuario) =>{  
   
    let config = {
        
        method: 'get',
        maxBodyLength: Infinity,
        url: `${sapDomain}zwm_lt01?sap-client=310&ubicacionOrigen=${ubicacionOrigen}&almacen=${almacen}&ubicacionDestino=${ubicacionDestino}&centro=${centro}&cantidad=${cantidad}&material=${material}&lote=${lote}&pallet=${pallet}&bandera=${bandera}&loteDestino=${loteDestino}&usuario=${usuario}`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.SESSIONWM_AUTORIZATION , 
            'Cookie': process.env.SESSIONWM_COOKIE
        },
      };
      
      const response =   axios.request(config)
      .then((response) => {
          return response.data;
      })
      .catch((error) => {
          return JSON.stringify(error);
      });
  
      return response; 

}

export const RegistraPickingsService = (entrega, posEnterga, material, lote, pallet, cantidadBuena,CantidadRota, um, usuario, bandera, id,posOt, ot) =>{


    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${sapDomain}/z_alist_post?sap-client=310`,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization':  process.env.SESSIONWM_AUTORIZATION  ,
            'Cookie': process.env.SESSIONWM_COOKIE
        },
        data : {
            entrega   : entrega,
            posicion  : posEnterga,
            material  : material,
            lote      : lote,
            consestiba: pallet,
            cantbuena : cantidadBuena,
            cantrotura: CantidadRota,
            UMBASE    : um,
            usuario   : usuario,
            bandera   : bandera,
            IDX       : id,
            POSOT     : posOt,
            OT        : ot,
        }

        };   
        
    const response =   axios.request(config)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    });

    return response;  
}
