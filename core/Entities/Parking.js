class Parking {
  getAvaliablePlaces(Db, args) {
    return Db.query('CALL pa_ta_avalibleSpaces(?);', [args])
  }
}

module.exports = Parking;
