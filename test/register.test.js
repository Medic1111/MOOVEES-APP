const request = require("supertest");
const app = require("../server/index");
jest.setTimeout(20000);
let random = Math.floor(Math.random() * 1000) + 1;
let username = `${random}user`;
let email = `${random}user@gmail.com`;
let password = `${random}password`;

describe("Testing routes and responses for REGISTER", () => {
  test("No or missing data", async () => {
    let data = {
      username: "",
      password: "",
      email: "",
    };

    await request(app)
      .post("/api/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Incomplete required fields" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Already registered user attempts to re-register", async () => {
    let data = {
      username: "newUserTet",
      password: "newUserTet",
      email: "newUserTest@newUsrst.com",
    };

    await request(app)
      .post("/api/register")
      .send(data)
      .expect(409)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Email Already Registered" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Successful registration", async () => {
    let data = {
      username,
      password,
      email,
    };

    await request(app)
      .post("/api/register")
      .send(data)
      .expect(200)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ wish: expect.any(Array) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ watched: expect.any(Array) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ _id: expect.any(String) })
        );
        expect(serverRes.body.password.length).toBeGreaterThan(10);
      })
      .catch((err) => console.log(err));
  });
});
