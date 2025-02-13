

export const labsmobile = {
    
    async sendSms (message,numero){
    let data = JSON.stringify({
        "message": message,
        "tpoa": "SENDER",
        "recipient": [
          {
            "msisdn": numero
          }
        ]
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.labsmobile.com/json/send',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic d2VibWFzdGVyQGNlcmFtaWNhaXRhbGlhLmNvbTpyQU5McWdQMjBqOHVadjlkVklZcWk4clFTMXczNTFNbQ=='
        },
        data : data
      };

      try {
        const response = await axios.request(config);
        return response.data;
      }
      catch (error) {
        return(error);
      }
    }
}