
//This line is for cannot redeclare block scoped variable error
export { };

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


const adminLogin = async () => {
  const res = await request(app).post("/api/v1/login").send({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  });
  return res.headers["set-cookie"];
};

describe("GET /api/v1/clothes", () => {
  it("should return 200 OK", async () => {
    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/clothes")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
  });
});

describe("GET /api/v1/clothes/:id", () => {
  it("should return 200 OK", async () => {
    const result = {
      clothes: {
        "_id": "65dc01a9f8d2cd847ab0d4f7",
        "color": "fef65b",
        "size": "L", 
        "name": "Test", 
        "price": 0,
        "type": "T-Shirt",
        "ownerId": "65d72840551e36b2bb8b95e3"
      },
    };

    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/clothes/65dc01a9f8d2cd847ab0d4f7")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(result);
  });
});


describe("GET /api/v1/clothes/user/:id", () => {
  it("should return 200 OK", async () => {
    const result = {
      clothes: {
        "_id": "65dc01a9f8d2cd847ab0d4f7",
        "color": "fef65b",
        "size": "L", 
        "name": "Test", 
        "price": 0,
        "type": "T-Shirt",
        "ownerId": "65d72840551e36b2bb8b95e3"
      },
    };
    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/clothes/user/65d72840551e36b2bb8b95e3")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(result);
  });
});

describe("POST /api/v1/user", () => {
  it("should return 201 OK", async () => {
    const newClothes = {
      "color": "fef65b",
      "size": "XXL", 
      "name": "Test2", 
      "price": 190,
      "type": "T-Shirt",
      "ownerId": "65d72840551e36b2bb8b95e3"
    };

    const adminHeader = await adminLogin();
    const res = await request(app)
      .post("/api/v1/clothes")
      .set("Cookie", [adminHeader])
      .send(newClothes);
    expect(res.status).toBe(201);

    await request(app)
      .delete("/api/v1/clothes")
      .set("Cookie", [adminHeader])
      .send({id: res.body.clothes._id});
  });
});


describe("PATCH /api/v1/clothes", () => {
  it("should return 200 OK", async () => {
    const oldClothes = {
      "_id": "65dc01a9f8d2cd847ab0d4f7",
      "color": "fef65b",
      "size": "L",
      "name": "Test",
      "price": 0,
      "type": "T-Shirt",
      "ownerId": "65d72840551e36b2bb8b95e3"
    }

    const newClothes = {
      "_id": "65dc01a9f8d2cd847ab0d4f7",
      "color": "fef65b",
      "size": "L",
      "name": "Test",
      "price": 10,
      "type": "T-Shirt",
      "ownerId": "65d72840551e36b2bb8b95e3"
    }

    const adminHeader = await adminLogin();

    const res = await request(app)
      .patch("/api/v1/clothes/")
      .set("Cookie", [adminHeader])
      .send(newClothes);

    expect(res.status).toBe(200);
    expect(res.body.updatedClothes).toHaveProperty("price", 10);

    await request(app)
      .patch("/api/v1/clothes")
      .set("Cookie", [adminHeader])
      .send(oldClothes);
  })})

  describe("DELETE /api/v1/clothes/:id", () => {
    it("should return 200 OK", async () => {
      const newClothes = {
        "color": "fef65e",
        "size": "L",
        "name": "Test",
        "price": 10,
        "type": "T-Shirt",
        "ownerId": "65d72840551e36b2bb8b95e3"
      };
  
      const adminHeader = await adminLogin();
  
      const creatingNewClothes = await request(app)
        .post("/api/v1/clothes")
        .set("Cookie", [adminHeader])
        .send(newClothes);
  
      const res = await request(app)
        .delete("/api/v1/clothes/")
        .set("Cookie", [adminHeader])
        .send({id: creatingNewClothes.body.clothes._id});
      expect(res.status).toBe(200);
    });
  });