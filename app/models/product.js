const sql = require('./db')

// Constructor
const Product = function (product) {
    this.name = product.name
    this.price = product.price
}

// Create New Product
Product.Create = (newProduct, result) => {
    sql.query("INSERT INTO product VALUES ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId , ...newProduct})
    })
}


// Indexing Product Data
Product.Index = (result) => {
    sql.query("SELECT * FROM product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res)
    })
}

module.exports = Product;