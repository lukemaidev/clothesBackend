
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

describe("GET /api/v1/notification", () => {
  it("should return 200 OK", async () => {
    const adminHeader = await adminLogin();
    const res = await request(app)
      .get("/api/v1/notifications")
      .set("Cookie", [adminHeader]);
    expect(res.status).toBe(200);
  });
});

describe("GET /api/v1/notification/:id", () => {
    it("should return 200 OK", async () => {
      const result = {
        notification: {
            "_id": "65dc0f6cb0260f3d0e467ba8",
            "ownerId": "65d72840551e36b2bb8b95e3",
            "message": "Test Message in Play",
            "read": false
        },
      };
  
      const adminHeader = await adminLogin();
      const res = await request(app)
        .get("/api/v1/notifications/65dc0f6cb0260f3d0e467ba8")
        .set("Cookie", [adminHeader]);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(result);
    });
  });

describe("POST /api/v1/notification", () => {
  it("should return 201 OK", async () => {
    const adminHeader = await adminLogin();
    const res = await request(app)
      .post("/api/v1/notifications")
      .set("Cookie", [adminHeader])
      .send({
        ownerId: "65d72840551e36b2bb8b95e3",
        message: "Test Message in Play 2"
      });
    expect(res.status).toBe(201);

    await request(app)
        .delete("/api/v1/notifications")
        .set("Cookie", [adminHeader])
        .send({ id: res.body.notification._id });
  });
});

describe("PATCH /api/v1/notification", () => {
  it("should return 200 OK", async () => {
    const oldNotification = {
        _id: "65dc0f6cb0260f3d0e467ba8",
        ownerId: "65d72840551e36b2bb8b95e3",
        message: "Test Message in Play"
        }
    
    const newNotification = {
        _id: "65dc0f6cb0260f3d0e467ba8",
        ownerId: "65d72840551e36b2bb8b95e3",
        message: "Test Message in Play Kekw"
    }

    const adminHeader = await adminLogin();
    const res = await request(app)
      .patch("/api/v1/notifications")
      .set("Cookie", [adminHeader])
      .send(newNotification);
    expect(res.status).toBe(200);
    console.log(res.body)
    expect(res.body.updatedNotification).toHaveProperty("message", "Test Message in Play Kekw");

    

    await request(app)
        .patch("/api/v1/notifications")
        .set("Cookie", [adminHeader])
        .send(oldNotification);
  });
});

describe("DELETE /api/v1/notification", () => {
  it("should return 200 OK", async () => {
    const adminHeader = await adminLogin();
    const res = await request(app)
      .post("/api/v1/notifications")
      .set("Cookie", [adminHeader])
      .send({
        ownerId: "65d72840551e36b2bb8b95e3",
        message: "Test Message in Play 2"
      });
    expect(res.status).toBe(201);

    const res2 = await request(app)
      .delete("/api/v1/notifications")
      .set("Cookie", [adminHeader])
      .send({ id: res.body.notification._id });
    expect(res2.status).toBe(200);
  });
});

describe("PATCH /api/v1/notification/read/user/:id", () => {
    it("should return 200 OK", async () => {
        const adminHeader = await adminLogin();
        const res = await request(app)
        .patch("/api/v1/notifications/read/user/65d72840551e36b2bb8b95e3")
        .set("Cookie", [adminHeader]);
        expect(res.status).toBe(200);

        await request(app)
        .patch("/api/v1/notifications/unread/user/65d72840551e36b2bb8b95e3")
        .set("Cookie", [adminHeader]);
        expect(res.status).toBe(200);
    });
});

