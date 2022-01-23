const {
  api,
  baseURL_videogames,
  initialState_videogames,
  allVideogames,
} = require("./helper");
const mongoose = require("mongoose");
const VideoGames = require("../models/videogames.model");
const Categories = require("../models/category.model");

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await VideoGames.deleteMany({});
  await Categories.deleteMany({});

  const newCat = await Categories({ name: "testing" });
  const categoria = await newCat.save();

  for (let game of initialState_videogames) {
    const newGame = await VideoGames({ ...game, category: categoria._id });
    await newGame.save();
  }
});

describe("VIDEOGAMES", () => {
  describe("GET /api/videogames", () => {
    test("must respond with 200 status code", async () => {
      const res = await api.get(baseURL_videogames);
      expect(res.statusCode).toBe(200);
    });

    test("must respond with an array", async () => {
      const res = await api.get(baseURL_videogames);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).not.toBeInstanceOf(String);
      expect(res.body).not.toBeInstanceOf(Number);
    });

    test(`must respond with ${initialState_videogames.length} games`, async () => {
      const res = await api.get(baseURL_videogames);
      expect(res.body).toHaveLength(initialState_videogames.length);
    });
  });

  describe("POST /api/videogames", () => {
    describe("When all data is OK", () => {
      const data = {
        name: "GTA",
        description: "esta bueno",
        price: 30,
        quantity: 2,
        image: `${__dirname}/test_IMG.jpg`,
      };

      test("must respond 200 status code widtout an image", async () => {
        const categoryGame = await Categories.findOne();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .field("name", data.name)
          .field("description", data.description)
          .field("price", data.price)
          .field("quantity", data.quantity)
          .field("category", categoryGame._id.toString());

        expect(res.statusCode).toBe(200);
      });

      test("must respond 200 status code widt an image", async () => {
        const categoryGame = await Categories.findOne();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .field("name", data.name)
          .field("description", data.description)
          .field("price", data.price)
          .field("quantity", data.quantity)
          .field("category", categoryGame._id.toString())
          .attach("image", data.image);

        expect(res.statusCode).toBe(200);
      });

      test("must return the object added", async () => {
        const categoryGame = await Categories.findOne();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .field("name", data.name)
          .field("description", data.description)
          .field("price", data.price)
          .field("quantity", data.quantity)
          .field("category", categoryGame._id.toString())
          .attach("image", data.image);

        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.name).toBeDefined();
        expect(res.body.price).toBeDefined();
        expect(res.body.description).toBeDefined();
        expect(res.body.image).toBeDefined();
        expect(res.body.category).toBeDefined();
      });

      test("must add a new element into the database", async () => {
        const categoryGame = await Categories.findOne();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .field("name", data.name)
          .field("description", data.description)
          .field("price", data.price)
          .field("quantity", data.quantity)
          .field("category", categoryGame._id.toString())
          .attach("image", data.image);

        const videogames = await allVideogames();

        expect(videogames.body).toHaveLength(
          initialState_videogames.length + 1
        );
      });
    });

    describe("When some/all data is not OK", () => {

      test("must retrun 400 status code if all body is missing", async () => {
        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data");

        expect(res.statusCode).toBe(400)
      });

      test("must retrun 400 status code if some body is missing", async () => {
        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .field("name", "BadPost")
          .field("description", "BadPost")

        expect(res.statusCode).toBe(400)
      });

      test("must return the message that seid Name, description, price and category fields are requierd", async () => {

        const msg = "Name, description, price and category fields are all required"
        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .field("name", "BadPost")
          .field("description", "BadPost")

        expect(JSON.stringify(res.body)).toBe(JSON.stringify(msg))
      });

      test("mustn't add a new element into the database", async () => {

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .field("name", "BadPost")
          .field("description", "BadPost")

        const videogames = await allVideogames()

        expect(videogames.body).toHaveLength(initialState_videogames.length )
      });


    });
  });
});
