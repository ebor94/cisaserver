import { validateDomain } from "../../services/Domain/index.js";
import { logAccesos } from "../../db/login/index.js";
import { generateToken, validateToken } from '../../services/jwt/index.js';
import { loginSapService } from "../../services/sap/login.js";
import { Zcisaparmetros } from "../../services/sap/parametros.js";




export const LoginSap = async (data) => {
    let response = {}
  const dataLogin =  await loginSapService(data)
  //EMPTY PAYLOAD
  console.log(dataLogin)
  //  console.log(dataLogin[0].message )
  if(!dataLogin.length){
    response.succes = false;
    response.token = null;
    response.data = dataLogin
    
  }else{
    let key = generateToken(data.password)
    response.succes = true;
    response.token = key;
    response.data = dataLogin
  }

  return response
}


export const LoginDomain = async (req, res) => {
    let user = req.body.user;
    let pass = req.body.pass;
    validateDomain(req, res)
    //res.send("xxx") 

}

export const logsLogin = async (req) => {
    let user = req.body.user;
    let app = req.body.app;

    const response = await logAccesos(user, app)

    return response;
}

export const GetZcisaparmetros = async (req, res) =>{
    let data =  req.body
    const response =  await Zcisaparmetros(data)

    return response
}

