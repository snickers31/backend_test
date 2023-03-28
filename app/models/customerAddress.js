const sql = require('./db')

// Constructor
const CustomerAddress = function (customer) {
    this.address = customer.address
    this.customer_id = customer.customer_id
}


// Function for indexing customer addresses data
CustomerAddress.Index = (result) => {
    sql.query("SELECT * FROM customer_address", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res)
    })
}



// function for create new customer address
CustomerAddress.Create = (newCustomerAddress, result) => {
    sql.query("INSERT INTO customer_address VALUES ?", newCustomerAddress, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newCustomerAddress })
    })
} 

module.exports = CustomerAddress