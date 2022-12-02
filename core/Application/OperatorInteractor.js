import Operator from "../Entities/Operator.js";

class OperatorInteractor {
    getOperator({DB, id}) {
        const response = DB.query("CALL getOperator(?)", [id]);
        let operator = null;
        response.then((res) => res.json())
                .then((res) => {
                    const {
                        ID_operador,
                        identification_number,
                        user_name,
                        password,
                        operator_state,
                        level_access
                    } = res[0];
                    operator = new Operator({ID_operador, identification_number, level_access, operator_state, user_name, password, })
                })
                .catch((err) => {
                    console.log(err);
                })
        return operator;
    }
}

module.exports = OperatorInteractor;