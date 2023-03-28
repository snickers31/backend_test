const Order = require("../models/order");



exports.Create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var input = {
        customer_address_id: req.body.customer_address_id,
        products: req.body.products,
        payments: req.body.payments
    }

    Order.Create(input, (err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the order."
            });
        else res.send(result);
    }
    )

}


exports.Index = (req, res) => {
    Order.Index((err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        else res.send(result);
    })
}