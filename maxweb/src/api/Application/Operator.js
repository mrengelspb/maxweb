const UserController = require('../interface/controller/UserController.js');
const { User } = require('../Entities/User.js');

class Operator extends UserController {
    constructor() {
        super();
    }   
}

module.exports = Operator;
