const fs = require("fs-extra");
const path = "./data/payments.json";
const Payment = require("../models/paymentModel");

const saveToFile = async (payments) => {
  await fs.writeJson(path, payments);
};

const readFromFile = async () => {
  try {
    return await fs.readJson(path);
  } catch {
    return [];
  }
};

const createPayment = async (data) => {
  const newPayment = new Payment(data);
  const payments = await readFromFile();
  payments.push(newPayment);
  await saveToFile(payments);
  processPaymentAsync(newPayment.id);
  return newPayment;
};

const getPaymentById = async (id) => {
  const payments = await readFromFile();
  return payments.find((p) => p.id === id);
};

const getAllPayments = async ({ page = 1, limit = 10, status } = {}) => {
  const payments = await readFromFile();
  let filteredPayments = payments;

  if (status) {
    filteredPayments = filteredPayments.filter((p) => p.status === status);
  }

  const total = filteredPayments.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    total,
    page,
    limit,
    payments: filteredPayments.slice(startIndex, endIndex),
  };
};

const updatePaymentStatus = async (id, status) => {
  const payments = await readFromFile();
  const index = payments.findIndex((p) => p.id === id);
  if (index === -1) return null;
  payments[index].status = status;
  payments[index].updatedAt = new Date();
  await saveToFile(payments);
  return payments[index];
};

const processPaymentAsync = (id) => {
  setTimeout(async () => {
    try {
      const payment = await getPaymentById(id);
      if (!payment) {
        console.error(`Payment with ID ${id} not found.`);
        return;
      }
      if (payment.status !== "pending") {
        console.log(`Payment ${id} already processed.`);
        return;
      }
      await updatePaymentStatus(id, "completed");
      console.log(`Payment ${id} processed.`);
    } catch (error) {
      console.error(`Error processing payment ${id}:`, error);
    }
  }, 5000);
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePaymentStatus,
  getAllPayments,
};
