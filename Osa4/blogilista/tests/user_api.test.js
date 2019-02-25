const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("false information", () => {
  test("new user with short username not added", async () => {
    const obj = {
      username: "Me",
      name: "Itsame",
      password: "Mario"
    };
    const res = await api
      .post("/api/users")
      .send(obj)
      .expect(400);
  });
  test("new user with short password not added", async () => {
    const obj = {
      username: "ItsaME",
      name: "Itsame",
      password: "M"
    };
    const res = await api
      .post("/api/users")
      .send(obj)
      .expect(400);
  });
  test("new user with non unique username not added", async () => {
    const obj = {
      username: "Kukkis",
      name: "Itsame",
      password: "Mario"
    };
    const res = await api
      .post("/api/users")
      .send(obj)
      .expect(400);
  });

  test("new user with undefined fields not added", async () => {
    const obj = {
      name: "Itsame"
    };
    const res = await api
      .post("/api/users")
      .send(obj)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
