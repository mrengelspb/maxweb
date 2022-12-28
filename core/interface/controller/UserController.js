class UserController {
    constructor() {

    }

    search(DB, args) {
        return DB.query('CALL pa_ti_search(?)', args)
    }

    finalize(DB, args) {
        return DB.query('CALL pa_ti_finalize(?, ?, ?, ?, ?, ?)', args)            
    }
}

module.exports = UserController;
