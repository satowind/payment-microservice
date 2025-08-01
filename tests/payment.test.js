const request = require("supertest");
const app = require("../app");

describe("Payment API", () => {
  let paymentId;

  it("should return 404 for non-existent route", async () => {
    const res = await request(app).get("/api/nonexistent");
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Not Found");
  });

  it("should create a payment", async () => {
    const res = await request(app)
      .post("/api/payments")
      .send({ amount: 200, currency: "USD" });
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual("pending");
    paymentId = res.body.id;
  });

  it("should return validation error for invalid payment data", async () => {
    const res = await request(app)
      .post("/api/payments")
      .send({ amount: -100, currency: "US" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation failed");
    expect(res.body.errors).toContain('"amount" must be a positive number');
    expect(res.body.errors).toContain(
      '"currency" length must be 3 characters long'
    );
  });

  it("should retrieve the payment", async () => {
    const res = await request(app).get(`/api/payments/${paymentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(paymentId);
  });

  it("should update the payment status", async () => {
    const res = await request(app)
      .patch(`/api/payments/${paymentId}`)
      .send({ status: "failed" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("failed");
  });
});

// I will also test other scenarios in a production app
// I also decided on integration test but in real app i will go round doing unit test on some functions too
