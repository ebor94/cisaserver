import {
  getInfoPallet,
  GetPorductPrice,
  GetRoturaController,
  GetSamples,
  infoEtiqueta,
} from "../../controllers/producto/producto.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post(process.env.RUTA_PRODUCT_PRICE, (req, res) => {
  const data = req.body;
  GetPorductPrice(data).then((response) => {
    res.send(response);
  });
});

router.post(process.env.RUTA_PRODUCT_SAMPLE, (req, res) => {
  const data = req.body;
  GetSamples(data).then((response) => {
    res.send(response);
  });
});
/**
 * @swagger
 *
 * /producto/rotura/{centro}/{mov1}/{mov2}/{fechaini}/{fechafin}/{bandera}:
 *   get:
 *     summary: Get indicator product break only warehouse and type transaction between date's
 *     tags:
 *       - Producto # Categoría o sección donde aparecerá esta ruta
 *     parameters:
 *       - in: path
 *         name: centro
 *         required: true
 *         value: '1100'
 *         description: wareHouse
 *         schema:
 *           type: string
 *       - in: path
 *         name: mov1
 *         required: true
 *         value: '551'
 *         description: type transaction
 *         schema:
 *           type: string
 *       - in: path
 *         name: mov2
 *         required: true
 *         value: '552'
 *         description: type transaction
 *         schema:
 *           type: string
 *       - in: path
 *         name: fechaini
 *         required: true
 *         value: '20240101'
 *         description: start Date
 *         schema:
 *           type: string
 *       - in: path
 *         name: fechafin
 *         required: true
 *         value: '20241130'
 *         description: End Date
 *         schema:
 *           type: string
*       - in: path
 *         name: bandera
 *         required: true
 *         value: '1'
 *         description: filter query 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: return wareHouse and Quantity product break
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                          werks:
 *                              type: string
 *                          lgort:
 *                               type: string
 *                          cantidadTotal:
 *                              type: number
 */
router.get(process.env.RUTA_GET_ROTURA, (req, res) => {
  let centro = req.params.centro;
  let mov1 = req.params.mov1;
  let mov2 = req.params.mov2;
  let fechaini = req.params.fechaini;
  let fechafin = req.params.fechafin;
  let bandera = req.params.bandera
  GetRoturaController(centro, mov1, mov2, fechaini, fechafin,bandera).then(
    (response) => {
      res.send(response);
    }
  );
});

/**
 * @swagger
 *
 * /producto/infopallet/{pallet}/{lote}/{material}:
 *   get:
 *     summary: Get pallet information  with paking 
 *     tags:
 *       - Producto # Categoría o sección donde aparecerá esta ruta
 *     parameters:
 *       - in: path
 *         name: pallet
 *         required: true
 *         value: '0001990534'
 *         description: pallet
 *         schema:
 *           type: string
 *       - in: path
 *         name: lote
 *         required: true
 *         value: '0000015660'
 *         description: lote del producto
 *         schema:
 *           type: string
 *       - in: path
 *         name: material
 *         required: true
 *         value: '000000000000203080'
 *         description: codigo de material
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: return pallet information  with paking 
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 */
router.get('/producto/infopallet/:pallet/:lote/:material', async (req,res)=>{
  let pallet = req.params.pallet
  let lote = req.params.lote
  let material = req.params.material
  const response = await getInfoPallet(pallet,lote,material);
  res.send(response);
})
/**
 * @swagger
 * /producto/etiqueta/{pallet}:
 *   get:
 *     summary: Obtiene información de etiqueta por número de pallet
 *     description: Retorna la información detallada de una etiqueta basada en el número de pallet proporcionado
 *     tags: 
 *       - Etiquetas
 *     parameters:
 *       - in: path
 *         name: pallet
 *         required: true
 *         description: Número de pallet de 10 dígitos
 *         schema:
 *           type: string
 *           pattern: '^\d{10}$'
 *           example: '0002015457'
 *     responses:
 *       200:
 *         description: Información de etiqueta recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 'Información de etiqueta recuperada exitosamente'
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ubicacion:
 *                         type: string
 *                         example: 'UBICACION-A1'
 *                         maxLength: 15
 *                       cantidad:
 *                         type: number
 *                         format: decimal
 *                         example: 100.000
 *                       lote:
 *                         type: string
 *                         example: 'LOTE123'
 *                         maxLength: 10
 *                       codigoSap:
 *                         type: string
 *                         example: 'SAP001'
 *                         maxLength: 18
 *                       pallet:
 *                         type: string
 *                         example: '0002015457'
 *                         maxLength: 10
 *                       material:
 *                         type: string
 *                         example: 'MATERIAL-001'
 *                         maxLength: 100
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 'Formato de pallet inválido. Debe ser numérico de 10 dígitos'
 *       404:
 *         description: Pallet no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/producto/etiqueta/:pallet', async (req, res) => {  
  const { pallet } = req.params;  
    
  const result = await infoEtiqueta(pallet);  
    
  res.status(result.status).json(result);  
});

export default router;
