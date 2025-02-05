import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv'
dotenv.config()
const urlApprecio = 'https://apiv2.apprecio.com.co/api';

export const cuponList =  {

  async getCupon(){
    let data = new FormData();
    data.append('accion', 'getListadoGiftcard');
    data.append('ts', '123456');
    data.append('tipo', 'json');
    data.append('public_token', process.env.public_token_apprecio);
    data.append('hash', 'd725e14f5cb3900a38fe74ed82b821ed');

    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: urlApprecio,
      headers: { 
        ...data.getHeaders()
      },
      data : data
    };
    
   const response  = await  axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return  error;
    });

    return response;
  }, 

  async getGiftCard(id){
    let data = new FormData();
    data.append('accion', 'getStockGc');
    data.append('ts', '123456');
    data.append('tipo', 'json');
    data.append('public_token', process.env.public_token_apprecio);
    data.append('hash', 'd725e14f5cb3900a38fe74ed82b821ed');
    data.append('idGiftcard', id);

    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: urlApprecio,
      headers: { 
        ...data.getHeaders()
      },
      data : data
    };
    
   const response  = await  axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return  error;
    });

    return response;
  },
  async buyGiftCard(hash, idGiftcard, valor, userCode, userName){
    let data = new FormData();
    data.append('accion', 'reedemGifCard');
    data.append('ts', '123456');
   // data.append('tipo', 'json');
    data.append('public_token', process.env.public_token_apprecio);
    data.append('hash', hash);
    data.append('idGiftcard', idGiftcard);
    data.append('valor',valor)
    data.append('userCode' ,userCode)
    data.append('userName',userName)

    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: urlApprecio,
      headers: { 
        ...data.getHeaders()
      },
      data : data
    };
    
   const response  = await  axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return  error;
    });

    return response;
  },
    
}