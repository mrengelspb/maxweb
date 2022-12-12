class AdminController {
    constructor() {

    }

    create(DB, args) {
        return DB.query('CALL createAccount(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', args);
    }
}

module.exports = AdminController;