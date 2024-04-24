import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

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