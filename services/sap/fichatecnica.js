import  axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

export const GetDataSheetSap = (CODSAP) =>{
    let clase = '001'
    let data = JSON.stringify({
        "vcodsap": CODSAP,
        "vclase": clase
            });
      
      let config = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: process.env.FT_URL,
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

export const GetProductText=(material,idioma,vid,object)=>{


  let data = JSON.stringify({
    "MATERIAL": material,
    "IDIOMA"  :idioma,
    "VID"     :vid,
    "OBJECT"  :object
          });
    
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: process.env.FT_URL_PRODUCT_TEXT,
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