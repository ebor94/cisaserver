import { getFlujoIngreso } from "../../db/corporativo/porteria.js"

export const getFlujo = (id, tipo) =>{
    const response  = getFlujoIngreso(id, tipo)

    return response;
}