const app = require("../server/index");
const request = require("supertest");
jest.setTimeout(20000);
const { userId, movieObj, movieId } = require("../server/utils/helper");

describe("TESTING ROUTES RELATED TO WISHLIST", () => {
  beforeEach(async () => {
    await request(app)
      .post(`/api/${userId}/wish`)
      .send(movieObj)
      .expect(200)
      .expect("Content-type", /json/)
      .catch((err) => console.log(err));
  });

  test("Adds title to wishlist", async () => {
    await request(app)
      .post(`/api/${userId}/wish`)
      .send(movieObj)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Array));
        expect(serverRes.body).toEqual(
          expect.arrayContaining([expect.any(Object)])
        );
        expect(serverRes.body.length).toBeGreaterThan(0);
      })
      .catch((err) => console.log(err));
  });

  test("Moving title from WISH to WATCHED list", async () => {
    await request(app)
      .patch(`/api/${userId}/wishlist/watched/${movieId}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Moved to watched" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("Removing Title from Wishlist", async () => {
    await request(app)
      .patch(`/api/${userId}/wishlist/remove/${movieId}`)
      .expect(200)
      .expect("Content-type", /json/)
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
