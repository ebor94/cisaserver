import { cuponList } from "../../services/appPrecio/index.js";
import { GetHeadQuote, GetInvoice } from "../../services/sap/invoice.js";
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

export const buyGiftCard = async (
  idGiftcard,
  userCode,
  bpCode,
  userName,
  valorgif
) => {
  // Configuración del hash (considerar mover a variables de entorno)

  try {
    // Validación del cliente
    const clienteBP = await GetCliente(userCode);
    if (!clienteBP.success || !clienteBP.data?.[0]?.kunnr) {
      return {
        success: false,
        data: "Error al obtener datos del cliente",
      };
    }

    // Validación del código BP
    if (clienteBP.data[0].kunnr !== bpCode) {
      return {
        success: false,
        data: "Código BP no coincide",
      };
    }

    // Obtención y validación de la gift card
    const giftCard = await getGiftCard(idGiftcard);
    if (!giftCard.data?.status === "success") {
      return {
        success: false,
        data: "Error al obtener datos de la gift card",
      };
    }

    // Validación de stock y valor
    let valoresGif = giftCard.data.stocks;
    let valorDisponible = valoresGif.find((stock) => stock.valor == valorgif);
    if (!valorDisponible) {
      return {
        success: false,
        data: "Gift card no disponible o sin stock",
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
      data: compraResult,
    };
  } catch (error) {
    console.error("Error en buyGiftCard:", error);
    return {
      success: false,
      error: error.message,
      data: "Error interno al procesar la compra",
    };
  }
};

export const RegistrarItalPuntos = async (consecutivo, pedido, codBp) => {
  if (!consecutivo || !pedido || !codBp) {
    return {
      success: false,
      error: "Parámetros incompletos",
      comision: 0,
    };
  }
  try {
    let data = {
      BANDERA: "13",
      OFERTA: pedido,
      MARGENALIADO: "",
      MARGENINTERNO: "",
      TOKEN: "",
      RESPUESTAWP: "",
      USUARIOAPROB: "",
      FILTRO: "",
      CODBP: codBp,
    };
    const headQuote = await GetHeadQuote(data);
    
    if (!headQuote || !headQuote.length) {
      return {
        success: false,
        error: "No se encontró la cotización",
        comision: 0,
      };
    }

    const consecutivoApi = headQuote[0].consecutivo;

    if (consecutivoApi !== consecutivo) {
      return {
        success: false,
        message: "Consecutivo no coincide",
        comision: 0,
      };
    }
  
    if (consecutivoApi == consecutivo) {    
        let invoice = await GetInvoice(pedido, "C", "S", "", "", "", "");
        // Validar respuesta de GetInvoice
        if (!invoice || !invoice.length) {
          return {
            success: false,
            error: "No se encontraron datos de factura",
            comision: 0,
          };
        }
        const totalNeto = invoice.reduce((sum, item) => sum + item.vneto, 0);
        const comision = totalNeto * 0.01; // 1%
        let raw = {
          BANDERA: "03",
          OFERTA: pedido,
          MARGENALIADO:comision,
          MARGENINTERNO: "",
          TOKEN: "",
          RESPUESTAWP: "",
          USUARIOAPROB: "",
          FILTRO: "",
          CODBP: codBp,
        };
        const regPuntos = await GetHeadQuote(raw);
        if (!regPuntos || !regPuntos.length) {
          return {
            success: false,
            error: "No se encontró la cotización",
            comision: 0,
          };
        }
        return {
          comision: comision,
          quote: regPuntos
        };
      
    } else {
      return {
        comision: 0,
      };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
};
