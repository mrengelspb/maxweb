class Card {
  constructor(id, id_parking, secuencial, state, _in, out, expiration_date, code, minutes_used, client_type, value_pay) {
    this.id = id;
    this.parking = id_parking;
    this.secuencial = secuencial;
    this.state = state;
    this.in = _in;
    this.out = out;
    this.expiration_date = expiration_date;
    this.code = code;
    this.minutes = minutes_used;
    this.client = client_type;
    this.value = value_pay;
  }

  info() {
    return { id: this.id,
             parking: this.parking,
             secuencial: this.secuencial,
             state: this.state,
             in: this.in,
             out: this.out,
             expiratation_date: this.expiration_date,
             code: this.code,
             minutes: this.minutes,
             client: this.client,
             value: this.value
            };
  }
}

module.exports = Card;
