const Parking = require('../Entities/Parking.js');

class ParkingInteractor {
    spaceAvaliables(Db, args) {
        const parking = new Parking();
        return parking.getAvaliablePlaces(Db, args);
    }
}

module.exports = ParkingInteractor;
