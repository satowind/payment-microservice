const { v4: uuidv4 } = require('uuid');

class Payment {
  constructor({ amount, currency }) {
    this.id = uuidv4();
    this.amount = amount;
    this.currency = currency;
    this.status = "pending";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Payment;
