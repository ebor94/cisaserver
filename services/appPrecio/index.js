import axios from 'axios';
import FormData from 'form-data';
const urlApprecio = 'https://apiv2.apprecio.com.co/api';

export const cuponList = async () => {
    let data = new FormData();
    data.append('accion', 'getListadoGiftcard');
    data.append('ts', '123456');
    data.append('tipo', 'json');
    data.append('public_token', '88fed48f46e8d46ffff74df9daeca42e');
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
    
}