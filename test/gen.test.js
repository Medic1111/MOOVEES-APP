const request = require("supertest");
const app = require("../server/index");
const {
  getByIdRoute,
  getByPostTitleRoute,
  movieTitle,
} = require("../server/utils/helper");

describe("Testing the General non DB related routes", () => {
  test("Get movie by sending params", async () => {
    await request(app)
      .get(getByIdRoute)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ Title: expect.any(String) })
        );
        expect(serverRes.body.Poster).toBeTruthy();
      })
      .catch((err) => console.log(err));
  });

  test("Get movie by POSTING title", async () => {
    const data = { userInput: movieTitle };

    await request(app)
      .post(getByPostTitleRoute)
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Array));
        expect(serverRes.body.length).toBeGreaterThan(0);
        expect(serverRes.body).toEqual(
          expect.arrayContaining([expect.any(Object)])
        );
      })
      .catch((err) => console.log(err));
  });
});
