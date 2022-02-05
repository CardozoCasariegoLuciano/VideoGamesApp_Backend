const {
  api,
  baseURL_videogames,
  initialState_videogames,
  allDBElements,
  getOneElement,
  initialState_auth,
  logginUser,
} = require("./tests-helpers/helper");
const mongoose = require("mongoose");
const VideoGames = require("../models/videogames.model");
const Categories = require("../models/category.model");
const User = require("../models/user.model");

afterAll(async () => {
  await mongoose.connection.close();
});

beforeAll(async () => {
  await User.deleteMany({});

  //register and login User for JWT
  const registerData = initialState_auth[0];
  await api.post("/api/auth/register").send(registerData);
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
    describe("When all data is OK, and have Token", () => {
      const data = {
        name: "GTA",
        description: "esta bueno",
        price: 30,
        quantity: 2,
        image: `${__dirname}/tests-helpers/test_IMG.jpg`,
      };

      test("must respond 200 status code widtout an image", async () => {
        const categoryGame = await Categories.findOne();

        const userLogued = await logginUser();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
          .field("name", data.name)
          .field("description", data.description)
          .field("price", data.price)
          .field("quantity", data.quantity)
          .field("category", categoryGame._id.toString());

        expect(res.statusCode).toBe(200);
      });

      test("must respond 200 status code widt an image", async () => {
        const categoryGame = await Categories.findOne();
        const userLogued = await logginUser();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
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
        const userLogued = await logginUser();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
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
        const userLogued = await logginUser();

        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
          .field("name", data.name)
          .field("description", data.description)
          .field("price", data.price)
          .field("quantity", data.quantity)
          .field("category", categoryGame._id.toString())
          .attach("image", data.image);

        const videogames = await allDBElements(baseURL_videogames);

        expect(videogames.body).toHaveLength(
          initialState_videogames.length + 1
        );
      });
    });

    describe("When some/all data is not OK, but have valid token", () => {
      test("must retrun 400 status code if all body is missing", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_videogames)
          .set("Authorization", userLogued.token)
          .set("Content-Type", "multipart/form-data");

        expect(res.statusCode).toBe(400);
      });

      test("must retrun 400 status code if some body is missing", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
          .field("name", "BadPost")
          .field("description", "BadPost");

        expect(res.statusCode).toBe(400);
      });

      test("must return the message that seid Name, description, price and category fields are requierd", async () => {
        const userLogued = await logginUser();
        const msg =
          "Name, description, price and category fields are all required";
        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
          .field("name", "BadPost")
          .field("description", "BadPost");

        expect(JSON.stringify(res.body)).toBe(JSON.stringify(msg));
      });

      test("mustn't add a new element into the database", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
          .field("name", "BadPost")
          .field("description", "BadPost");

        const videogames = await allDBElements(baseURL_videogames);

        expect(videogames.body).toHaveLength(initialState_videogames.length);
      });
    });
  });

  describe("DELETE /api/videogames/:id", () => {
    describe("When a valid ID is sended, and have a valid token", () => {
      test("must respond 200 status code", async () => {
        const userLogued = await logginUser();
        const videogame = await getOneElement(baseURL_videogames, "random");
        const id = videogame._id;

        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);

        expect(res.statusCode).toBe(200);
      });

      test("must respont with the message 'Video game removed'", async () => {
        const userLogued = await logginUser();
        const videogame = await getOneElement(baseURL_videogames, "random");
        const id = videogame._id;

        const msg = "Video game removed";
        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);

        expect(JSON.stringify(res.body)).toBe(JSON.stringify(msg));
      });

      test("must have 1 less element into de DB", async () => {
        const userLogued = await logginUser();
        const videogame = await getOneElement(baseURL_videogames, "random");
        const id = videogame._id;

        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);

        const allGames = await allDBElements(baseURL_videogames);

        expect(allGames.body).toHaveLength(initialState_videogames.length - 1);
      });
    });

    describe("When the ID does not exist or is invalid, but have a valid token", () => {
      test("must respond with 400 status code: Invalid ID", async () => {
        const userLogued = await logginUser();
        const id = "SUPERBADID";
        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);

        expect(res.statusCode).toBe(400);
      });

      test("must respond with 400 status code: ID no Exist", async () => {
        const userLogued = await logginUser();
        const id = "61ed664a4c3669f448230938";
        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);

        expect(res.statusCode).toBe(400);
      });

      test("must respond with 'object not found' : ID no Exist", async () => {
        const userLogued = await logginUser();
        const id = "61ed664a4c3669f448230938";
        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);

        expect(res.body.message).toBe("Game not found");
      });

      test("must respond with 'object not found': Invalid ID", async () => {
        const userLogued = await logginUser();
        const id = "NANANA";
        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);

        expect(res.body.message).toBe("Invalid ID");
      });

      test("mustn't remove any element from DB: ID no Exist", async () => {
        const userLogued = await logginUser();
        const id = "61ed664a4c3669f448230938";
        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);
        const allGames = await allDBElements(baseURL_videogames);

        expect(allGames.body).toHaveLength(initialState_videogames.length);
      });

      test("mustn't remove any element from DB: Invalid ID", async () => {
        const userLogued = await logginUser();
        const id = "123saf3ii4";
        const res = await api
          .delete(baseURL_videogames + id)
          .set("Authorization", userLogued.token);
        const allGames = await allDBElements(baseURL_videogames);

        expect(allGames.body).toHaveLength(initialState_videogames.length);
      });
    });
  });

  describe("GET /api/videogames/:id", () => {
    describe("When a valid ID is sended", () => {
      test("must return 200 status code", async () => {
        const game = await getOneElement(baseURL_videogames, "random");
        const id = game._id;

        const res = await api.get(baseURL_videogames + id);
        expect(res.statusCode).toBe(200);
      });

      test("must return a single object", async () => {
        const game = await getOneElement(baseURL_videogames, "random");
        const id = game._id;

        const res = await api.get(baseURL_videogames + id);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).not.toBeInstanceOf(Array);
      });
    });

    describe("When a invalid ID is sended", () => {
      test("must return 400 status code", async () => {
        const id = "asdasdasdasdasd";

        const res = await api.get(baseURL_videogames + id);
        expect(res.statusCode).toBe(400);
      });

      test("must return a message that seid 'Invalid ID'", async () => {
        const id = "asdasdasdasdasd";

        const res = await api.get(baseURL_videogames + id);
        expect(res.body.message).toBe("Invalid ID");
      });
    });

    describe("When a No existing ID is sended, but still valid", () => {
      test("must return 200 status code", async () => {
        const id = "61ed564a4c3669f448230938";

        const res = await api.get(baseURL_videogames + id);
        expect(res.statusCode).toBe(400);
      });

      test("must return a message Game not found", async () => {
        const id = "61ed564a4c3669f448230938";

        const res = await api.get(baseURL_videogames + id);
        expect(res.body.message).toBe("Game not found");
      });
    });
  });

  describe("GET /api/videogames/image/:id", () => {
    describe("When a valid ID is sended", () => {
      test("must return 200 status code", async () => {
        const game = await getOneElement(baseURL_videogames, "random");
        const id = game._id;

        const res = await api.get(baseURL_videogames + "image/" + id);
        expect(res.statusCode).toBe(200);
      });

      test("and the game have not an image, must return an empty object", async () => {
        const game = await getOneElement(baseURL_videogames, "random");
        const id = game._id;

        const res = await api.get(baseURL_videogames + "image/" + id);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toStrictEqual({});
      });

      test("and the game have an image, must return it", async () => {
        const userLogued = await logginUser();
        const data = {
          name: "GTA",
          description: "esta bueno",
          price: 30,
          quantity: 2,
          image: `${__dirname}/tests-helpers/test_IMG.jpg`,
        };
        const categoryGame = await Categories.findOne();

        const addGame = await api
          .post(baseURL_videogames)
          .set("Content-Type", "multipart/form-data")
          .set("Authorization", userLogued.token)
          .field("name", data.name)
          .field("description", data.description)
          .field("price", data.price)
          .field("quantity", data.quantity)
          .field("category", categoryGame._id.toString())
          .attach("image", data.image);

        const id = addGame.body._id;
        const res = await api.get(baseURL_videogames + "image/" + id);

        expect(res.headers["content-type"]).toBe("image/jpeg");
        expect(res.body).toBeInstanceOf(Buffer);
      });
    });

    describe("When a invalid ID is sended", () => {
      test("must return 400 status code", async () => {
        const id = "asdasdasdasdasd";

        const res = await api.get(baseURL_videogames + "image/" + id);
        expect(res.statusCode).toBe(400);
      });

      test("must return a message that seid 'Invalid ID'", async () => {
        const id = "asdasdasdasdasd";

        const res = await api.get(baseURL_videogames + "image/" + id);
        expect(res.body.message).toBe("Invalid ID");
      });
    });

    describe("When a No existing ID is sended, but still valid", () => {
      test("must return 200 status code", async () => {
        const id = "61ed564a4c3669f448230938";

        const res = await api.get(baseURL_videogames + "image/" + id);
        expect(res.statusCode).toBe(400);
      });

      test("must return 'Game not found'", async () => {
        const id = "61ed564a4c3669f448230938";

        const res = await api.get(baseURL_videogames + "image/" + id);
        expect(res.body.message).toBe("Game not found");
      });
    });
  });
});
