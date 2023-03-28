const sql = require('./db')

// Constructor
const Customer = function(customer) {
    this.customer_name = customer.customer_name
}

// Function for indexing customer data
Customer.Index = (result) => {
    sql.query("SELECT * FROM customer", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res)
    })
} 

// Function for create new customer
Customer.Create = (newCustomer, result) => {
    sql.query("INSERT INTO customer VALUES ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newCustomer })
    })
} 

module.exports = Customer