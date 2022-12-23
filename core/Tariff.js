class Tariff {
  list = {};

  constructor(database, id_parking) {
    this.database = database;
    this.id_parking = id_parking;
  }

  async uploadTariffs() {
    const response = await this.database.query("CALL pa_pt_getTariff(?)", [this.id_parking]);
    const data = JSON.parse(JSON.stringify(response[0]));
    if (data.length === 0) {
      console.log("Ocurrio un error cargando tarigas desde el servidor !");
      return (false);
    } else {
       for (const tariff of data) {
          this.list[tariff.description] = tariff;
       }
       return (true)
     }
  }

  calculateTotal(time, tariff) {
    if (time <= this.list[tariff].min_fraction) {
      return Total = this.list[tariff].min_value;
    }
    const days = Math.floor(time / (60 * 24));
    const fraction = Math.ceil(time / this.list[tariff].fraction);
    return parseFloat(fraction * parseFloat(this.list[tariff].value)).toFixed(2);
  }
}

module.exports = Tariff;
