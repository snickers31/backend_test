const PaymentMethod = require("../models/paymentMethod");



exports.Create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var newPaymentMethod = new PaymentMethod({
        name: req.body.name,
        is_active: req.body.is_active,
    })

    PaymentMethod.Create(newPaymentMethod, (err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the payment method."
            });
        else res.send(result);
    }
    )

}


exports.Index = (req, res) => {
    PaymentMethod.Index((err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while loading the payment method."
            });
        else res.send(result);
    })
}