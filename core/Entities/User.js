class User {
  constructor ({ identification_number, ID_operador, operator_state, user_name, password, level_access }) {
    this.identification = identification_number;
    this.idOperador = ID_operador;
    this.operatorState = operator_state;
    this.userName = user_name;
    this.password = password;
    this.levelAccess = level_access;
  }
}

module.exports = User;