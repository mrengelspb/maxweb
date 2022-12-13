const module11 = require('../modulo-11.js');

class Factura {
  constructor(ambiente_codigo, emision_codigo, numero_serie,
    identification_number, id_fe_emisoragret, date, tipo_comprobante) {
    this.ambiente_codigo = ambiente_codigo;
    this.emision_codigo = emision_codigo;
    this.numero_serie = numero_serie;
    this.identification_number = identification_number;
    this.id_fe_emisoragret = id_fe_emisoragret;
    this.date = date;
    this.tipo_comprobante = tipo_comprobante;
  }

  generar_codigo(numero_comprobante) {
    this.date = this.date.replaceAll("-","");
    const codigo = this.date + this.tipo_comprobante + this.identification_number
    + this.ambiente_codigo + this.numero_serie
    + numero_comprobante + "11223344" + this.emision_codigo;
    let digito_verificador = module11(codigo);
    if (digito_verificador == 11) {
      digito_verificador = 0;
    } else if (digito_verificador === 10) {
      digito_verificador = 1;
    }
    return codigo + digito_verificador;
  }

  getNumeroComprobante(DB){
    return DB.query(`CALL pa_lsri_numeroComprobante()`, []);
  }
}

module.exports = Factura;