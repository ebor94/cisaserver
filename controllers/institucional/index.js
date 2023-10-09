import {horarioListarSalas, horariomostrardisponible, horarioRegistrarTurno} from '../../db/institucional/index.js'

export const HorarioListarSalas =  async(bandera) =>{
    const response = await horarioListarSalas(bandera);
    return response;

}

export const Horariomostrardisponible =  async(data) =>{
    
    let idsala = data.sala;
    let fecha =  data.fecha;
    const response = await horariomostrardisponible(idsala, fecha);
    return response;

}

export const HorarioRegistrarTurno =  async(data) =>{    
    const response = await horarioRegistrarTurno(data);
    return response;
}

