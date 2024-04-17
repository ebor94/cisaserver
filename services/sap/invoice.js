import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()


export  const GetInvoice = (LCODIGO,LTIPO,TPROCESO,PCODSOLICITANTE,PHANDLE,FECHAINI,FECHAFIN) =>{

    let data = JSON.stringify({
        "LCODIGO" : LCODIGO,
        "LTIPO" : LTIPO,
        "TPROCESO" : TPROCESO,
        "PCODSOLICITANTE" : PCODSOLICITANTE,
        "PHANDLE" : PHANDLE,
        "FECHAINI" : FECHAINI,
        "FECHAFIN" : FECHAFIN
      });


      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.GETINVOICE_URL,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': process.env.GETINVOICE_AUTORIZATION , 
          'Cookie': process.env.GETINVOICE_COOKIE
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