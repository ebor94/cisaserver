import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()
const sapDomain = "https://itaprd.ceramicaitalia.com:44301/sap/bc/rest/"
export const  GetName  =  (Codsap,Lang )=>{
   console.log(Codsap,Lang )
    let data = JSON.stringify({
        "vcodsap":  Codsap,      
        "vlang" :   Lang
            });

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.GETNAME_URL,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': process.env.GETNAME_AUTORIZATION , 
            'Cookie': process.env.GETNAME_COOKIE
        },
        data : data
        };        
        const response =   axios.request(config)
      .then((response) => {
        console.log(response.data)
        return response.data;
      })
      .catch((error) => {
        return JSON.stringify(error);
      });

      return response;

}


export const GetPrice = ({KUNNR,MATNR,WERKS,LVTWEG,VKBUR,PRDESC,VKORG,CANTI,UMVTA,FLAX,FECHA,MOTIVOP,MATNR_CHILD}) =>{

  let datax = JSON.stringify({
    "KUNNR":KUNNR,
    "MATNR":MATNR,
    "WERKS":WERKS,
    "LVTWEG":LVTWEG,
    "VKBUR":VKBUR,
    "PRDESC":PRDESC,
    "VKORG":VKORG,
    "CANTI":CANTI,
    "UMVTA":UMVTA,
    "FLAX":FLAX,
    "FECHA":FECHA,
    "MOTIVOP":MOTIVOP,
    "MATNR_CHILD":MATNR_CHILD
        });

let config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: process.env.PRECIO_LISTA_URL,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': process.env.GETNAME_AUTORIZATION , 
        'Cookie': process.env.GETNAME_COOKIE
    },
    data : datax
    };        
    const response =   axios.request(config)
  .then((response) => {
    //console.log(response.data)
    return response.data;
  })
  .catch((error) => {
    return JSON.stringify(error);
  });

  return response;

}

export const SamplePortfolio = (bp) => {

  let config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: process.env.SAMPLES_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETNAME_AUTORIZATION,
      'Cookie': process.env.GETNAME_COOKIE
    },
    data: bp
  };
  const response = axios.request(config)
    .then((response) => {
      //console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;


}

export const infoPallet = (pallet,lote,material) => {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${sapDomain}zgetinfopallet?sap-client=310&pallet=${pallet}&lote=${lote}&material=${material}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETNAME_AUTORIZATION,
      'Cookie': process.env.GETNAME_COOKIE
    },
  
  };
  const response = axios.request(config)
    .then((response) => {
      //console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;

}