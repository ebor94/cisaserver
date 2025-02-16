import { Product } from "./product.js";
import axios from "axios";

// Mock de axios
jest.mock("axios");

describe("Product Integration Tests", () => {
  // Configuración antes de cada test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test para caso exitoso
  test("Etiqueta should return correct data for valid pallet", async () => {
    // Mock de respuesta exitosa
    const mockResponse = {
      data: {
        d: {
          results: [
            {
              __metadata: {
                id: "https://itaprd.ceramicaitalia.com:44301/sap/opu/odata/sap/ZPP_ETIQUETAS_SRV/ZPP_INFO_ETIQUETASet('0002015457')",
                uri: "https://itaprd.ceramicaitalia.com:44301/sap/opu/odata/sap/ZPP_ETIQUETAS_SRV/ZPP_INFO_ETIQUETASet('0002015457')",
                type: "ZPP_ETIQUETAS_SRV.ZPP_INFO_ETIQUETA",
              },
              UBICACION: "",
              CANTIDAD: "70.200",
              LOTE: "0000017892",
              CODSAP: "000000000000203073",
              PALLET: "0002015457",
              MATERIAL: "ARIETTA 60X60 PRIMERA",
            },
            {
              __metadata: {
                id: "https://itaprd.ceramicaitalia.com:44301/sap/opu/odata/sap/ZPP_ETIQUETAS_SRV/ZPP_INFO_ETIQUETASet('0002015457')",
                uri: "https://itaprd.ceramicaitalia.com:44301/sap/opu/odata/sap/ZPP_ETIQUETAS_SRV/ZPP_INFO_ETIQUETASet('0002015457')",
                type: "ZPP_ETIQUETAS_SRV.ZPP_INFO_ETIQUETA",
              },
              UBICACION: "",
              CANTIDAD: "37.800",
              LOTE: "0000017820",
              CODSAP: "000000000000203045",
              PALLET: "0002015457",
              MATERIAL: "CATANIA 60X60 PRIMERA",
            },
            {
              __metadata: {
                id: "https://itaprd.ceramicaitalia.com:44301/sap/opu/odata/sap/ZPP_ETIQUETAS_SRV/ZPP_INFO_ETIQUETASet('0002015457')",
                uri: "https://itaprd.ceramicaitalia.com:44301/sap/opu/odata/sap/ZPP_ETIQUETAS_SRV/ZPP_INFO_ETIQUETASet('0002015457')",
                type: "ZPP_ETIQUETAS_SRV.ZPP_INFO_ETIQUETA",
              },
              UBICACION: "",
              CANTIDAD: "21.600",
              LOTE: "0000017705",
              CODSAP: "000000000000203061",
              PALLET: "0002015457",
              MATERIAL: "ITRIA BEIGE 60X60 PRIMERA",
            },
          ],
        },
      },
    };

    axios.request.mockResolvedValueOnce(mockResponse);

    const result = await Product.Etiqueta("0002015457");

    // Verificaciones
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      method: "get",
      maxBodyLength: Infinity,
      url: expect.stringContaining("0002015457"),
      headers: {
        Authorization: process.env.GETNAME_AUTORIZATION,
        Cookie: process.env.GETNAME_COOKIE,
      },
    });
    expect(result).toEqual(mockResponse.data);
  });
});
