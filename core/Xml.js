const totalConImpuestos = (productos, iva, total) => {
    let impuestos = "";
    impuestos += `<totalImpuesto>
                <codigo>${productos[0].codigo_impuesto}</codigo>
                <codigoPorcentaje>${productos[0].tarifa_codigo}</codigoPorcentaje>
                <baseImponible>${total}</baseImponible>
                <valor>${iva}</valor>
            </totalImpuesto>\n                `;
    return impuestos;
}

const pagos = (time, timeLimit, total, formaPago) => {
    let pagos = "";
    if (time === 0) {
        pagos += `<pago>
                <formaPago>${formaPago}</formaPago>
                <total>${total}</total>
                <plazo>${time}</plazo>
                <unidadTiempo>${timeLimit}</unidadTiempo>
            </pago>`;
    } else {
        for(let i = 0; i < time; i++) {
            pagos += `<pago>
                    <formaPago>${formaPago}</formaPago>
                    <total>${total/time}</total>
                    <plazo>${time}</plazo>
                    <unidadTiempo>${timeLimit}</unidadTiempo>
                </pago>`;
        }
    }
    return pagos;
};

const detalle = (productos) => {
    let detalle = "";
    for (const item of productos) {
        detalle += `<detalle>
                    <codigoPrincipal>${item.SKU}</codigoPrincipal>
                    <codigoAuxiliar>${item.SKU_aux}</codigoAuxiliar>
                    <descripcion>${item.nombre_producto}</descripcion>
                    <cantidad>${item.cantidad}</cantidad>
                    <precioUnitario>${item.valor_unitario}</precioUnitario>
                    <descuento>${item.descuento}</descuento>
                    <precioTotalSinImpuesto>${item.total}</precioTotalSinImpuesto>
                    <impuestos>
                    <impuesto>
                        <codigo>${item.codigo_impuesto}</codigo>
                        <codigoPorcentaje>${item.tarifa_codigo}</codigoPorcentaje>
                        <tarifa>${item.porcentaje_iva}</tarifa>
                        <baseImponible>${item.total}</baseImponible>
                        <valor>${(item.total * 12) / 100}</valor>
                    </impuesto>
                    </impuestos>
                 </detalle>`;
    }    
    return detalle;
};

module.exports =  function XmlGenerate (ListProducts, ambiente, emision, razon_social,
    nombre_comercial, ruc, clave_acceso, codDoc, estab, punto_emision,
    secuencial, dir_establecimiento_matriz, agente_retencion, contribuyente_rimpe,
    fechaEmision, dirEstablecimiento, obligadoContabilidad, tipoIdentificacionComprador, 
    razonSocialComprador, identificacionComprador, direccionComprador,
    totalSinImpuestos, totalDescuento, propina, time, timeLimit, total, formaPago, iva) {
    const schema = `
    <?xml version="1.0" encoding="UTF-8"?>
    <factura xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="file:/C:/borrar/xsd/111-xsd-1_V2.1.0.xsd" id="comprobante" version="version0">
        <infoTributaria>
            <ambiente>${ambiente}</ambiente>
            <tipoEmision>${emision}1</tipoEmision>
            <razonSocial>${razon_social}</razonSocial>
            <nombreComercial>${nombre_comercial}</nombreComercial>
            <ruc>${ruc}</ruc>
            <claveAcceso>${clave_acceso}</claveAcceso>
            <codDoc>${codDoc}</codDoc>
            <estab>${estab}</estab>
            <ptoEmi>${punto_emision}</ptoEmi>
            <secuencial>${secuencial}</secuencial>
            <dirMatriz>${dir_establecimiento_matriz}</dirMatriz>
            <agenteRetencion>${agente_retencion}</agenteRetencion>
            <contribuyenteRimpe>${contribuyente_rimpe}</contribuyenteRimpe>
        </infoTributaria>

        <infoFactura>
            <fechaEmision>${fechaEmision}</fechaEmision>
            <dirEstablecimiento>${dirEstablecimiento}</dirEstablecimiento>
            <obligadoContabilidad>${obligadoContabilidad}</obligadoContabilidad>
            <tipoIdentificacionComprador>${tipoIdentificacionComprador}</tipoIdentificacionComprador>
            <razonSocialComprador>${razonSocialComprador}</razonSocialComprador>
            <identificacionComprador>${identificacionComprador}</identificacionComprador>
            <direccionComprador>${direccionComprador}</direccionComprador>
            <totalSinImpuestos>${totalSinImpuestos}</totalSinImpuestos>
            <totalDescuento>${totalDescuento}</totalDescuento>
            <totalConImpuestos>
                ${totalConImpuestos(ListProducts, iva, total)}
            </totalConImpuestos>
            <propina>${propina}</propina>
            <importeTotal>${total}</importeTotal>
            <moneda>DOLAR</moneda>
            <pagos>
                ${pagos(time, timeLimit, total, formaPago)}
            </pagos>
        </infoFactura>

        <detalles>
            ${detalle(ListProducts)}
        </detalles>

        <infoAdicional>
            <campoAdicional nombre="Vendedor ">Vendedor</campoAdicional>
            <campoAdicional nombre="Correo ">ventas@solucionesplanb.com.ec</campoAdicional>
            <campoAdicional nombre="Ciudad ">CUENCA</campoAdicional>
        </infoAdicional>
    `

    return schema;
};

