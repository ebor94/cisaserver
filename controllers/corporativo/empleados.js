import { getEmpleadoDb } from "../../db/corporativo/empleados.js";


export const GetEmpleado = (cc) =>{
    const response  = getEmpleadoDb(cc)

    return response;
}