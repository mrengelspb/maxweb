class ProductInterator {
    constructor(){

    }
    create(db, info){
        return db.query('CALL add_product(?, ?)', info);
    }
    getProduct(db, id) {
        return db.query('CALL search_product(?)', id);
    }
}

module.exports = {
    ProductInterator
}