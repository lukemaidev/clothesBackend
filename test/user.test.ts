//This line is for cannot redeclare block scoped variable error
export {};

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

const adminLogin = async () => {
  const res = await request(app).post("/api/v1/login").send({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  });
  return res.headers["set-cookie"];
};

describe("GET /api/v1/user", () => {
  it("should return 200 OK", async () => {
    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/user")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
  });
});

describe("GET /api/v1/user/:id", () => {
  it("should return 200 OK", async () => {
    const result = {
      user: {
        _id: "65d6c294a590782c6999817a",
        username: "Something",
        password: "Somethingelse",
        email: "huh@gmail.com",
        role: "user",
        userType: "user",
      },
    };

    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/user/id/65d6c294a590782c6999817a")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(result);
  });
});

describe("GET /api/v1/email/:email", () => {
  it("should return 200 OK", async () => {
    const result = {
      user: {
        _id: "65d6c294a590782c6999817a",
        username: "Something",
        password: "Somethingelse",
        email: "huh@gmail.com",
        role: "user",
        userType: "user",
      },
    };

    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/user/email/huh@gmail.com")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(result);
  });
});

describe("GET /api/v1/user", () => {
  it("should return 200 OK", async () => {
    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/user")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
  });
});

describe("POST /api/v1/user", () => {
  it("should return 201 OK", async () => {
    const newUser = {
      username: "Something123",
      password: "Somethingelse123",
      email: "Something@gmail.com",
    };

    const adminHeader = await adminLogin();
    const res = await request(app)
      .post("/api/v1/user")
      .set("Cookie", [adminHeader])
      .send(newUser);
    expect(res.status).toBe(201);

    await request(app)
      .delete("/api/v1/user/")
      .set("Cookie", [adminHeader])
      .send({id: res.body.user._id});
  });
});

describe("DELETE /api/v1/user/:id", () => {
  it("should return 200 OK", async () => {
    const newUser = {
      username: "Something12345",
      password: "Somethingelse12345",
      email: "Something12345@gmail.com",
    };

    const adminHeader = await adminLogin();

    const creatingNewUser = await request(app)
      .post("/api/v1/user")
      .set("Cookie", [adminHeader])
      .send(newUser);

    const res = await request(app)
      .delete("/api/v1/user/")
      .set("Cookie", [adminHeader])
      .send({id: creatingNewUser.body.user._id});
    expect(res.status).toBe(200);
  });
});


describe("PATCH /api/v1/user", () => {
  it("should return 200 OK", async () => {
    const oldUser = {
      "_id": "65d72840551e36b2bb8b95e3",
      "username": "TestUser",
      "password": "123",
      "email": "kekw@gmail.com",
      "userType": "user"
    }

    const newUser = {
      "_id": "65d72840551e36b2bb8b95e3",
      "username": "TestUser",
      "password": "1234",
      "email": "kekw4@gmail.com",
      "userType": "user"
    }

    const adminHeader = await adminLogin();

    const res = await request(app)
      .patch("/api/v1/user")
      .set("Cookie", [adminHeader])
      .send(newUser);

    expect(res.status).toBe(200);
    expect(res.body.updatedUser).toHaveProperty("email", "kekw4@gmail.com");

    await request(app)
      .patch("/api/v1/user")
      .set("Cookie", [adminHeader])
      .send(oldUser);
  })})