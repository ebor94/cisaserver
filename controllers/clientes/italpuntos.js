import { cuponList } from "../../services/appPrecio/index.js";
import { GetCliente } from "./index.js";


export const getCuponList = async () => {
  try {
    const response = await cuponList.getCupon();
    if (!response || response.length === 0) {
      return {
        success: false,
        data: null,
      };
    }
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getGiftCard = async (id) => {
  try {
    const response = await cuponList.getGiftCard(id);
    if (!response || response.length === 0) {
      return {
        success: false,
        data: null,
      };
    }
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const buyGiftCard = async (idGiftcard, userCode, bpCode, userName, valorgif) => {
  // Configuración del hash (considerar mover a variables de entorno)



  try {
    // Validación del cliente
    const clienteBP = await GetCliente(userCode);
    if (!clienteBP.success || !clienteBP.data?.[0]?.kunnr) {
      return {
        success: false,
        data: "Error al obtener datos del cliente"
      };
    }

    // Validación del código BP
    if (clienteBP.data[0].kunnr !== bpCode) {
      return {
        success: false,
        data: "Código BP no coincide"
      };
    }

    // Obtención y validación de la gift card
    const giftCard = await getGiftCard(idGiftcard);
    if (!giftCard.data?.status === "success") {
      return {
        success: false,
        data: "Error al obtener datos de la gift card"
      };
    }

    // Validación de stock y valor
    let valoresGif = giftCard.data.stocks;
    let valorDisponible =  valoresGif.find((stock) => stock.valor == valorgif);
    if (!valorDisponible) {
      return {
        success: false,
        data: "Gift card no disponible o sin stock"
      };
    }

    // Procesar la compra
    const compraResult = await cuponList.buyGiftCard(     
      idGiftcard,
      valorDisponible.valor,
      userCode,
      userName
    );

    return {
      success: true,
      data: compraResult
    };

  } catch (error) {
    console.error('Error en buyGiftCard:', error);
    return {
      success: false,
      error: error.message,
      data: "Error interno al procesar la compra"
    };
  }
};

