const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs identified with id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
});

test("new blog is added", async () => {
  const response = await api.get("/api/blogs");

  const obj = {
    title: "Uusi blogi",
    author: "Kukkis",
    url: "url",
    likes: 10,
    userId: "5c6ae6a55b9e30276ca8ef7f"
  };
  const res = await api
    .post("/api/blogs")
    .send(obj)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const secondRes = await api.get("/api/blogs");
  expect(secondRes.body.length).toBe(response.body.length + 1);
});

test("new blog with empty likes field is set to 0", async () => {
  const obj = {
    title: "Uusi blogi",
    author: "Kukkis",
    url: "url",
    userId: "5c6ae6a55b9e30276ca8ef7f"
  };
  const res = await api
    .post("/api/blogs")
    .send(obj)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const secondRes = await api.get("/api/blogs");
  expect(secondRes.body[secondRes.body.length - 1].likes).toBe(0);
});

test("new blog with empty title and url returns 400 Bad Request", async () => {
  const obj = {
    author: "Kukkis",
    likes: 300,
    userId: "5c6ae6a55b9e30276ca8ef7f"
  };
  const res = await api
    .post("/api/blogs")
    .send(obj)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
