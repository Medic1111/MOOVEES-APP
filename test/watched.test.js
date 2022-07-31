const app = require("../server/index");
const request = require("supertest");
const { userId, movieId, movieObj } = require("../server/utils/helper");
jest.setTimeout(20000);

describe("TESTING ROUTES FOR WATCHED", () => {
  test("Adding entry to the watched list", async () => {
    await request(app)
      .post(`/api/${userId}/watched`)
      .send(movieObj)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).toEqual(expect.any(Array));
        expect(serverRes.body).toEqual(
          expect.arrayContaining([expect.any(Object)])
        );
        expect(serverRes.body.length).toBeGreaterThan(0);
      })
      .catch((err) => console.log(err));
  });

  test("Remove title from watched list", async () => {
    await request(app)
      .patch(`/api/${userId}/watched/remove/${movieId}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Removed" })
        );
      })
      .catch((err) => console.log(err));
  });
});
