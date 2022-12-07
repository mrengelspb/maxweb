class ProductInterator {
    constructor(){

    }
    create(db, info){
        return db.query('CALL add_product(?, ?)', info);
    }
    getProduct(db, id) {
        return db.query('CALL pa_pr_searchProductById(?)', id);
    }
}

module.exports = {
    ProductInterator
}