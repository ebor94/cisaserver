import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

export const GetPacking = (CODSAP) =>{
    
    let data = JSON.stringify({
        "CODSAP": CODSAP,
        
            });
      
      let config = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: process.env.PACK_URL,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': process.env.FT_AUTORIZATION , 
          'Cookie': process.env.FT_COOKIE
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