class Factura {
  constructor(ambiente_codigo, emision_codigo, numero_serie,
    identification_number, id_fe_emisoragret, date, tipo_comprobante) {
    this.ambiente_codigo = ambiente_codigo;
    this.emision_codigo = emision_codigo;
    this.numero_serie = numero_serie;
    this.identification_number = identification_number;
    this.id_fe_emisoragret = id_fe_emisoragret;
    this.date = date;
    this.tipo_comprobante = tipo_comprobante
    this.numero_comprobante;
  }

  generar_codigo() {
    this.date = this.date.replaceAll("-","");
    return this.date + this.tipo_comprobante + this.identification_number + this.ambiente_codigo 
    + this.emision_codigo + this.numero_comprobante; 
  }
  getNumeroComprobante(DB){
    const query = DB.query(`CALL pa_lsri_numeroComprobante()`, []);
    query
      .then((res) => {
        res = JSON.parse(JSON.stringify(res[0][0]));
        console.log(res.state);
        this.numero_comprobante = res.state; 
      });
  }
}

module.exports = Factura;