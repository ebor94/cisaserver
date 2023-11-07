import  axios from 'axios';


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
        url: 'https://itaprd.ceramicaitalia.com:44301/sap/bc/rest/zmm_search_mate?sap-client=310',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic Ym9ydGVnYTpCb3J0ZWdhKzExMw==', 
          'Cookie': 'SAP_SESSIONID_CSP_310=ef73BHI0kpjaVJf0xcGPVaW3iT96axHuhAM7CslkDKM%3d; sap-usercontext=sap-client=310'
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

