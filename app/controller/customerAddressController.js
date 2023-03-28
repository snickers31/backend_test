const CustomerAddress = require("../models/customerAddress");



exports.Create = (req, res) => {
    // console.log(newCustomerAddress);
    // console.log("MASUK SINI");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    var newCustomerAddress = new CustomerAddress({
        customer_id: req.body.customer_id,
        address: req.body.address,
    })
    

    CustomerAddress.Create(newCustomerAddress, (err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the customer address."
            });
        else res.send(result);
    }
    )



}


exports.Index = (req, res) => {

}