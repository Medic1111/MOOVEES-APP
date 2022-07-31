const request = require("supertest");
const app = require("../server/index");
jest.setTimeout(20000);
let testUser = "medic1111";
let testPass = "1111";

describe("Testing the Login route possible instances", () => {
  test("Its successful for registered users with correct credentials", async () => {
    const data = { username: testUser, password: testPass };
    await request(app)
      .post("/api/login")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Array));
        expect(serverRes.body.length).toBeGreaterThan(0);
        expect(serverRes.body[0]).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ username: data.username }),
          ])
        );
      })
      .catch((err) => console.log(err));
  });

  test("Missing or no data will respond with ALL REQUIRED", async () => {
    const data = { username: "", password: "" };

    await request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Attempt to login with wrong credentials", async () => {
    let data = { username: "medic1111", password: "1123" };

    await request(app)
      .post("/api/login")
      .send(data)
      .expect(401)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Not registered" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Gts 404 when unregistered attempts login", async () => {
    let data = { username: "newone", password: "newone" };
    await request(app)
      .post("/api/login")
      .send(data)
      .expect(404)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
      })
      .catch((err) => console.log(err));
  });
});
