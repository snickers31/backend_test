const sql = require('./db')

// Constructor
const PaymentMethod = function (customer) {
    this.name = customer.name
    this.is_active = customer.is_active
}

// Indexinng PaymentMethod data
PaymentMethod.Index = (result) => {
    sql.query("SELECT * FROM payment_method", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res)
    })
}

// Create new payment method data
PaymentMethod.Create = (newPaymentMethod, result) => {
    sql.query("INSERT INTO payment_method SET ?", newPaymentMethod, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newPaymentMethod })
    })
} 


module.exports = PaymentMethod;