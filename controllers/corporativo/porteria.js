import { getFlujoIngreso } from "../../db/corporativo/porteria"

export const getFlujo = (id) =>{
    const response  = getFlujoIngreso(id)

    return response;
}