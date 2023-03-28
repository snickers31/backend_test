const Product = require("../models/product")



exports.Create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
    })

    Product.Create(newProduct, (err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        else res.send(result);
    })

}
exports.Index = (req, res) => {
    Product.Index((err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        else res.send(result);
    })
}