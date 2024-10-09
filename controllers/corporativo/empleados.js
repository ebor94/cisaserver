import { getEmpleadoDb } from "../../db/corporativo/empleados.js";


export const GetEmpleado = async (cc) =>{
    const response  = await  getEmpleadoDb(cc)

    return response;
}