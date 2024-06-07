import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

export const Zcisaparmetros = ({objetivo,campo1,campo11}) =>{
    let data = JSON.stringify({
      
        "OBJETIVO":objetivo,
        "CAMPO1":campo1,
        "CAMPO11":campo11
        
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.ZCISAPARMETROS_URL,
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