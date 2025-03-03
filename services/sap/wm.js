import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const sapDomain =  process.env.SAP_DOMAIN_REST

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

export const RegistraPickingsService = (entrega, posEnterga, material, lote, pallet, cantidadBuena,CantidadRota, um, usuario, bandera, id,posOt, ot,TPLECTURA) =>{


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
            TPLECTURA : TPLECTURA 
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


export const GetWeightDelivery = (entrega) =>{  
   
    let config = {
        
        method: 'get',
        maxBodyLength: Infinity,
        url: `${sapDomain}zmm_peso_entreg?sap-client=310&entrega=${entrega}`,
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


export const mt = {
    async getInfoMT(codMt,centro){
        let config = {
        
            method: 'get',
            maxBodyLength: Infinity,
            url: `${sapDomain}zwm_alist_ing?sap-client=310&vbeln=${codMt}&werks=${centro}`,
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
    },

    async getInfoIngreso(Consecutivo,Estado,Werks,Lgort,Vbeln){

        try {  
            // Construir la URL dinámicamente con los parámetros  
            const baseUrl = `${process.env.SAP_DOMAIN_ODATA}ZWM_ALISTAMIENTO_SRV/BodyEtiqSet`;  
            const filters = [  
              Consecutivo ? `Consecutivo eq '${Consecutivo}'` : null,  
              Estado ? `Estado eq '${Estado}'` : null,  
              Werks ? `Werks eq '${Werks}'` : null,  
              Lgort ? `Lgort eq '${Lgort}'` : null,  
              Vbeln ? `Vbeln eq '${Vbeln}'` : null,  
            ]  
              .filter(Boolean) // Eliminar filtros nulos  
              .join(' and '); // Unir los filtros con "and"  
          
            const url = `${baseUrl}?$filter=${filters}&$format=json`;  
          
            // Configuración de la solicitud  
            const config = {  
              method: 'get',  
              maxBodyLength: Infinity,  
              url: url,  
              headers: {  
                Authorization: 'Basic Ym9ydGVnYTpCb3J0ZWdhKzExMw==',  
                Cookie: 'SAP_SESSIONID_CSQ_310=TIU_-oIogSbv4aXpVA4lEBkxk6_4NBHvvY3ncTKwTus%3d; sap-usercontext=sap-client=310',  
              },  
            };  
          
            // Realizar la solicitud  
            const response = await axios.request(config);  
          
            // Validar que la respuesta contenga datos  
            if (response.data && response.data.d && response.data.d.results && response.data.d.results.length > 0) {  
              const { __metadata, AlistamientoIngreso, ...datosLimpios } = response.data.d.results[0];  
              return datosLimpios; // Retornar los datos limpios  
            } else {  
              throw new Error('No se encontraron datos en la respuesta.');  
            }  
          } catch (error) {  
            // Manejo de errores  
            console.error('Error al obtener la información de ingreso:', error.message);  
            return { error: error.message };  
          }
    },
    async  registrarIngreso(data) {  
        try {  
          // Configuración de la solicitud  
          const config = {  
            method: 'post',  
            maxBodyLength: Infinity,  
            url: `${process.env.SAP_DOMAIN_ODATA}ZWM_ALISTAMIENTO_SRV/AlistamientoIngresoSet`,  
            headers: {  
              'X-CSRF-Token': 'YRMHZZGth2rDJOr5xhFzdg==',  
              'Content-Type': 'application/json',  
              'Authorization': 'Basic Ym9ydGVnYTpCb3J0ZWdhKzExMw==',  
              'Cookie': 'SAP_SESSIONID_CSQ_310=TIU_-oIogSbv4aXpVA4lEBkxk6_4NBHvvY3ncTKwTus%3d; sap-usercontext=sap-client=310',  
            },  
            data: JSON.stringify(data), // Convertir el objeto data a JSON  
          };  
        
          // Realizar la solicitud  
          const response = await axios.request(config);  
        
          // Limpiar la respuesta  
          const { __metadata, BodyEtiqSet, ...datosLimpios } = response.data.d;  
        
          // Retornar los datos limpios  
          return datosLimpios;  
        } catch (error) {  
          // Manejo de errores  
          console.error('Error al registrar el ingreso:', error.message);  
          return { error: error.message };  
        }  
      }
}