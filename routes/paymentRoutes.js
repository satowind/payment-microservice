const express = require("express");
const router = express.Router();

const {
  createRequest,
  getAllRequest,
  validate,
  updateStatus,
} = require("../middlewares/request_validator");
const {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
} = require("../controllers/paymentController");

router.post("/", validate(createRequest, "body"), createPayment);
router.get("/:id", getSinglePayment);
router.get("/", validate(getAllRequest, "query"), getAllPayments);
router.patch("/:id", validate(updateStatus, "body"), updatePayment);

module.exports = router;
