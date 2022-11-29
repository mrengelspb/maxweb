class UserController {
    constructor() {

    }

    search(DB, args) {
        return DB.query('CALL search(?)', args)
    }

    finalize(DB, args) {
        return DB.query('CALL finalize()', args)            
    }
}

module.exports = UserController;
