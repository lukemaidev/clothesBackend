
//This line is for cannot redeclare block scoped variable error
export {};

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();
/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Login with correct credentials", () => {
  it("should return userdata without password and 200 OK", async () => {
    const user = {
      "username":"Something",
      "password":"Somethingelse"
    }
    const res = await request(app).post("/api/v1/login").send(user);
    expect(res.status).toBe(200);
  });
});

describe("Login with incorrect credentials", () => {
  it("should return userdata without password and 200 OK", async () => {
    const user = {
      "username":"Something",
      "password":"Somethingelse12"
    }
    const res = await request(app).post("/api/v1/login").send(user);
    expect(res.status).toBe(401);
  });
});
