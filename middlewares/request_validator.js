const Joi = require("joi");

exports.createRequest = Joi.object({
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).required(),
});

exports.updateStatus = Joi.object({
  status: Joi.string().valid("pending", "completed", "failed").required(),
});

exports.getAllRequest = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  status: Joi.string().valid("pending", "completed", "failed").optional(),
});

// Middleware for validation
exports.validate =
  (schema, property = "body") =>
  (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
    }); // abortEarly: false collects all errors

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // Optionally, assign the validated value back to the request object
    req[property] = value;
    next(); // Proceed to the next middleware or route handler
  };
