import { validateDomain } from "../../services/Domain/index.js";
import { logAccesos } from "../../db/login/index.js";



export const LoginSap = (data) => {

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

