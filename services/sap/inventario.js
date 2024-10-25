import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()


export const getInventory = (BUSQUEDA,DTLUBICA,PARCENTRO,PARALMACEN,PARORGVTA, PARACANAL) =>{
    
    let data = JSON.stringify({
        "BUSQUEDA": BUSQUEDA,
        "DTLUBICA": DTLUBICA,
        "PARCENTRO": PARCENTRO,
        "PARALMACEN": PARALMACEN,
        "PARORGVTA": PARORGVTA,
        "PARACANAL": PARACANAL
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.GETINVENTORY_URL,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': process.env.GETINVENTORY_AUTORIZATION , 
          'Cookie': process.env.GETINVENTORY_COOKIE
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

export const GetRotura = (centro, mov1, mov2, fechaini, fechafin,almacen) => {
  let config = {
    method: 'GET',
    maxBodyLength: Infinity,
    url:  `${process.env.ZWS_MSEG_URL}?sap-client=310&centro=${centro}&tmov1=${mov1}&tmov2=${mov2}&fechaini=${fechaini}&fechafin=${fechafin}&almacen=${almacen}&`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': process.env.GETINVENTORY_AUTORIZATION , 
      'Cookie': process.env.GETINVENTORY_COOKIE
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

