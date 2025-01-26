import axios from 'axios';
import qs from 'qs';

export const Claro = {
    async sendSms(numero , sms ) {
        let data = qs.stringify({
          'method': 'sendSMS',
          'subscriber': numero,
          'domain': 'ceramicaitalia.com',
          'message': sms,
          'date': '' 
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://mic.claro.com.co/servicesPME/app2mobile.jws',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': 'Basic YWRtaW5jZXJhbTo0RG0xbmMzcg=='
          },
          data : data
        };
        
       const response =  axios.request(config)
        .then((response) => {  
          const result = qs.parse(response.data);             
          return(result);
        })
        .catch((error) => {
          return(error);
        });

        return response;
        
    }
}