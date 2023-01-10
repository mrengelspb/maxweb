const Card = require('../Entities/Card.js');

class CardInteractor {
  constructor(db) {
    this.database = db;
  }

  async searchCardById(id) {
    try {
      let response = await this.database.query('CALL pa_ca_searchCardByCode(?)', id);
      response = JSON.parse(JSON.stringify(response[0]));
      if (response.length === 0) {
        return (404);
      } else {
        response = response[0];
        return new Card(response.id, response.id_parking, response.secuencial, response.state, response.in, response.out,
          response.expiration_date, response.code, response.minuted_used, response.client_type, response.value_pay);
      }
    } catch (error) {
      console.log(error);
      return (500);
    }
  }

  async updateCardById(args) {
    try {
      let response = await this.database.query('CALL pa_ca_updateCardByCode(?,?,?,?,?,?)', args);
      console.log(response);
      if (response.length === 0) {
        return (404);
      } else {
        return { msg: "Actualizado exitosamente" }
      }
    } catch (error) {
      console.log(error);
      return (500);
    }
  }
}

module.exports = CardInteractor;
