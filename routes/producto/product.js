import {
  getInfoPallet,
  GetPorductPrice,
  GetRoturaController,
  GetSamples,
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

export default router;
