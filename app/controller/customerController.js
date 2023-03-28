const Customer = require("../models/customer");



exports.Create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var newCustomer = new Customer({
        customer_name: req.body.customer_name
    })

    Customer.Create(newCustomer, (err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        else res.send(result);
    })


}


exports.Index = (req, res) => {
    Customer.Index((err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        else res.send(result);
    })
}