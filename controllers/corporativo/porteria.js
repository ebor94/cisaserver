import { getFlujoIngreso } from "../../db/corporativo/porteria.js"

export const getFlujo = (id) =>{
    const response  = getFlujoIngreso(id)

    return response;
}