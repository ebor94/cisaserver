import { validateDomain } from "../../services/Domain/index.js";

export const LoginSap = (data)=>{

}


export const  LoginDomain = async (req, res) =>{
    let user = req.body.user;
    let pass = req.body.pass;
    validateDomain(req,res)
    //res.send("xxx") 

   }

  
