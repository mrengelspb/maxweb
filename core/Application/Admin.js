const UserController = require('../interface/controller/UserController.js');

class Admin extends UserController {
    constructor() {
        super();
    }
}

module.exports = Admin;