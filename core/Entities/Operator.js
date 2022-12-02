class Operator {
  constructor({ID_operador, identification_Number, user_Name, password, operator_State, access_Level}) {
    this.ID_operador = ID_operador
    this.user_Name = user_Name;
    this.password = password;
    this.operator_State = operator_State;
    this.access_Level = access_Level;
    this.identification_Number = identification_Number;
  }
}


module.exports = {
  Operator
}
