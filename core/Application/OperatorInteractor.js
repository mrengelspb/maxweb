class OperatorInteractor {
    getOperator({DB, id}) {
        return DB.query("CALL getOperator(?)", [id]);
    }
}

module.exports = OperatorInteractor;