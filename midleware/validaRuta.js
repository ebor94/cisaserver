import { verifyAcces } from "../db/login/index.js";



export const validarRutaUsuario = async (req, res, next) => {
    const userId = req.headers['user-id']; // Supongamos que el ID del usuario viene en los headers
    const app    = req.headers['app']; // Supongamos que el ID del usuario viene en los headers
    //console.log(req)
    if (!userId) {
      return res.status(400).send({ error: 'Usuario no proporcionado' });
    }
  
    try {
      // Consulta a la base de datos para verificar si el usuario existe
      const usuario = await verifyAcces(userId,app); // Función que consulta la base de datos
      //console.log(usuario)
  
      if (usuario[0].INGRESA == 0) {
        return res.status(404).send({ error: 'No tiene Acceso a esta aplicacion' });
      }
  
      // Si el usuario existe, continua con la siguiente función (async de la ruta)
      next();  // Llama a `next()` para continuar con la siguiente función en la cadena de middlewares
    } catch (error) {
      // Si ocurre algún error durante la validación
      return res.status(500).send({ error: 'Error en la validación del usuario' });
    }
  };
  
