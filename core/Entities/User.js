class User {
  constructor ({ identification_number, ID_operador, operator_state, user_name, password, level_access, id_parking }) {
    this.identification = identification_number;
    this.idOperador = ID_operador;
    this.operatorState = operator_state;
    this.userName = user_name;
    this.password = password;
    this.levelAccess = level_access;
    this.id_parking = id_parking;
  }
}

module.exports = User;