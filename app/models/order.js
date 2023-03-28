const sql = require('./db')

// Constructor
const Order = function (customer) {
    this.customer_address = customer.customer_address
}

// Function for indexing order data
Order.Index = (result) => {
    sql.query("SELECT * FROM `order`", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res)
    })
}


// Function for create new order data
Order.Create = (newOrder, result) => {
    try {

        // Check record custome address exist or not 
        sql.query("SELECT * FROM customer_address WHERE id = ?", newOrder.customer_address_id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            // return error if data not found
            if (res.length < 1) {
                console.log("error: No data found with given id");
                result("No data found with given id", null);
                return;
            }

            sql.beginTransaction(function (err) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                var orderId = null

                // Creating Order data
                sql.query(
                    "INSERT INTO `order` (`customer_address_id`) VALUES (?);",
                    newOrder.customer_address_id,
                    (err, resultOrder) => {
                        if (err) {
                            console.log("error: ", err);
                            sql.rollback(function () {
                                result(err, null);
                                return;
                            });

                        }
                        console.log(resultOrder);
                        orderId = resultOrder.insertId;

                        var tempProducts = [];
                        var tempPayments = [];

                        // Create Bulk data for product
                        newOrder.products.forEach((element) => {
                            tempProducts.push([orderId, element]);
                        });
                        // Create Bulk data for payment method
                        newOrder.payments.forEach((element) => {
                            tempPayments.push([orderId, element]);
                        });

                        // Bulk Insert Relation Order Product
                        sql.query(
                            "INSERT INTO order_product VALUES ?",
                            [tempProducts],
                            (err, resultProduct) => {
                                if (err) {
                                    console.log("error: ", err);
                                    sql.rollback(function () {
                                        result(err, null);
                                        return;
                                    });
                                }
                            }
                        );

                        // Bulk Insert Relation Order payment method
                        sql.query(
                            "INSERT INTO order_payment_method VALUES ?",
                            [tempPayments],
                            (err, resultPayment) => {
                                if (err) {
                                    console.log("error: ", err);
                                    sql.rollback(function () {
                                        result(err, null);
                                        return;
                                    });
                                }

                                sql.commit(function (err) {
                                    if (err) {
                                        console.log("error: ", err);
                                        sql.rollback(function () {
                                            result(err, null);
                                            return;
                                        });
                                    }

                                    console.log("Order Created Successfully!");
                                    result(null, { message: "Order Created Successfully!" });
                                    return;
                                });
                            }
                        );
                    }
                );
            });
        });
    } catch (error) {
        console.log("error: ", error);
        result(error, null);
        return;
    }
};

module.exports = Order;