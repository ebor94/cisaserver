import { cuponList } from "../../services/appPrecio"


/**
 * @swagger
 * /italpuntos/CuponList/:
 *   post:
 *     summary: lista de cupones de italpuntos
 *     description: obtiene la lista de cupones de italpuntos atraves de la api de apprecio
 *     tags:
 *       - Italpuntos
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa
 *                 message:
 *                   type: string
 *                   description: Mensaje descriptivo del resultado
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Array con los datos de respuesta
 */
export const  getCuponList = async  () => {
    try {
        const response = await cuponList();
        if (!response || response.length === 0) {
            return {
              success: false,           
              data: null
            };
          }      
          return {
            success: true,        
            data: response
          };
    } catch (error) {
      return {        
        success: false,         
        error: error.message
      };

    }
}