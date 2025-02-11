import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

const domain = 'https://itaprd.ceramicaitalia.com:44301/sap/bc/rest/';


export const GetInvoice = (LCODIGO, LTIPO, TPROCESO, PCODSOLICITANTE, PHANDLE, FECHAINI, FECHAFIN) => {

  let data = JSON.stringify({
    "LCODIGO": LCODIGO,
    "LTIPO": LTIPO,
    "TPROCESO": TPROCESO,
    "PCODSOLICITANTE": PCODSOLICITANTE,
    "PHANDLE": PHANDLE,
    "FECHAINI": FECHAINI,
    "FECHAFIN": FECHAFIN
  });


  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.GETINVOICE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;

}


export const GetInfoSeller = (seller) => {

  let data = JSON.stringify({
    "PARAMETRO": seller
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.GET_INFO_SELLER,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;

}


export const GetHeadQuote = ({ BANDERA, OFERTA, MARGENALIADO, MARGENINTERNO, TOKEN, RESPUESTAWP, USUARIOAPROB, FILTRO , CODBP}) => {
  let data = JSON.stringify({

    "BANDERA": BANDERA,
    "OFERTA": OFERTA,
    "MARGENALIADO": MARGENALIADO,
    "MARGENINTERNO": MARGENINTERNO,
    "TOKEN": TOKEN,
    "RESPUESTAWP": RESPUESTAWP,
    "USUARIOAPROB": USUARIOAPROB,
    "FILTRO": FILTRO,
    "CODBP" : CODBP

  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${domain}/zws_cotizacion`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;

}

export const CreateOrderReference = (data) => {

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.ORDER_QUOTE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;
}

export const CreateConsecutive = (data) => {

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.CONSECUTIVE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;

}

export const CreateDetail = (data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.CREATE_DETAIL_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;
}


export const GetDetail = (data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.GET_DETAIL_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });
  return response;
}

export const DelPosDetail = (data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.FINISH_PROCESS_SALES_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;
}

export const FinishSales = (data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.FINISH_PROCESS_SALES_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;
}

export const GetCentroCiudad = (data) => {

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.INFO_CIUDAD_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
    data: data
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });

  return response;
}

export const contabilizarEntrega = (entrega, bandera)=>{
  

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${domain}zcontab_entrega?sap-client=310&entrega=${entrega}&bandera=${bandera}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.GETINVOICE_AUTORIZATION,
      'Cookie': process.env.GETINVOICE_COOKIE
    },
  };

  const response = axios.request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error);
    });


  return response 
}
