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
    console.log(this.list)
    return time * parseFloat(this.list[tariff].value);
  }
}

module.exports = Tariff;
