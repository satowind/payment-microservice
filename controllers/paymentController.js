const service = require("../services/paymentService");

exports.createPayment = async (req, res, next) => {
  try {
    const payment = await service.createPayment(req.body);
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

exports.getSinglePayment = async (req, res, next) => {
  try {
    const payment = await service.getPaymentById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Not found" });
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      status: status || undefined,
    };

    const payments = await service.getAllPayments(options);
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await service.updatePaymentStatus(
      req.params.id,
      req.body.status
    );
    if (!payment) return res.status(404).json({ error: "Not found" });
    res.json(payment);
  } catch (err) {
    next(err);
  }
};
