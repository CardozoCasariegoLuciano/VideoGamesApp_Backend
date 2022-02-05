const mongoose = require("mongoose");
const Categori = require("../models/category.model");
const User = require("../models/user.model");
const {
  api,
  initialState_category,
  allDBElements,
  baseURL_category,
  getOneElement,
  initialState_auth,
  logginUser,
} = require("./tests-helpers/helper");

afterAll(async () => await mongoose.connection.close());

beforeEach(async () => {
  await Categori.deleteMany({});

  for (let name of initialState_category) {
    const newName = new Categori(name);
    await newName.save();
  }
});

beforeAll(async () => {
  await User.deleteMany({});

  //register and login User for JWT
  const registerData = initialState_auth[0];
  await api.post("/api/auth/register").send(registerData);
});

describe("CATEGORY", () => {
  describe("GET /api/category/", () => {
    test("must respond with a 200 status code", async () => {
      const res = await api.get(baseURL_category);
      expect(res.statusCode).toBe(200);
    });

    test("must respont with a list", async () => {
      const res = await api.get(baseURL_category);
      expect(res.body).toBeInstanceOf(Array);
    });

    test(`must respond with ${initialState_category.length} elements`, async () => {
      const res = await api.get(baseURL_category);
      expect(res.body).toHaveLength(initialState_category.length);
    });
  });

  describe("POST /api/category/", () => {
    describe("When a name is sended, and have a JWT", () => {
      test("must respond 200 status code", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_category)
          .send({ name: "Pepe" })
          .set("Authorization", userLogued.token);
        expect(res.statusCode).toBe(200);
      });

      test("must add a new element into the database", async () => {
        const userLogued = await logginUser();

        const res = await api
          .post(baseURL_category)
          .send({ name: "Pepe" })
          .set("Authorization", userLogued.token);
        const categories = await allDBElements(baseURL_category);

        expect(categories.body).toHaveLength(initialState_category.length + 1);
      });

      test("must return the new element", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_category)
          .send({ name: "Pepe" })
          .set("Authorization", userLogued.token);
        expect(res.body.name).toBeDefined();
        expect(res.body._id).toBeDefined();
      });
    });

    describe("When a name is not sended, but have a jwt", () => {
      test("must send a 400 status code", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_category)
          .set("Authorization", userLogued.token);
        expect(res.statusCode).toBe(400);
      });

      test("mustn't add a new element", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_category)
          .set("Authorization", userLogued.token);
        const categories = await allDBElements(baseURL_category);
        expect(categories.body).toHaveLength(initialState_category.length);
      });

      test("must return a message that seid name is required", async () => {
        const userLogued = await logginUser();
        const res = await api
          .post(baseURL_category)
          .set("Authorization", userLogued.token);
        const msgEsperado = "a name is required";
        expect(res.body.message).toBe(msgEsperado);
      });
    });

    describe("When not have a JWT", () => {
      test("must respond a 401 status code", async () => {
        const res = await api.post(baseURL_category).send({ name: "Pepe" });
        expect(res.statusCode).toBe(401);
      });

      test("must respond an object", async () => {
        const res = await api.post(baseURL_category).send({ name: "Pepe" });
        expect(res.body).toBeInstanceOf(Object);
      });

      test("the respond must have a message that seid User not autorized", async () => {
        const res = await api.post(baseURL_category).send({ name: "Pepe" });

        msg = "User not autorized";
        expect(res.body.Message).toBe(msg);
      });
    });
  });

  describe("GET /api/category/:id", () => {
    describe("when a right ID is sened", () => {
      test("must respond 200 status code", async () => {
        const category = await getOneElement(baseURL_category, "first");
        const id = category._id;
        const res = await api.get(baseURL_category + id);
        expect(res.statusCode).toBe(200);
      });

      test("must respond with a single object", async () => {
        const category = await getOneElement(baseURL_category, "first");
        const id = category._id;
        const res = await api.get(baseURL_category + id);

        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).not.toBeInstanceOf(Array);
        expect(res.body).toStrictEqual(category);
      });

      test("must respond a message if the category does not exist", async () => {
        const randomID = "61ed764a4c3669f448230938";
        const res = await api.get(baseURL_category + randomID);

        const msg = { message: "Category not found" };

        expect(res.body).toStrictEqual(msg);
      });
    });

    describe("When a bad ID is sended", () => {
      test("must respont 400 status code", async () => {
        const id = "suPerBaDid";
        const res = await api.get(baseURL_category + id);
        expect(res.statusCode).toBe(400);
      });

      test("must return a message that seid invalid ID", async () => {
        const id = "suPerBaDid";
        const msgEsperado = "Invalid ID";
        const res = await api.get(baseURL_category + id);
        expect(res.body.message).toBe(msgEsperado);
      });
    });
  });

  describe("DELETE /api/category/:id", () => {
    describe("when a right ID is sened, ahd have a valid token", () => {
      test("must respond 200 status code", async () => {
        const userLogued = await logginUser();
        const category = await getOneElement(baseURL_category, "first");
        const id = category._id;
        const res = await api
          .delete(baseURL_category + id)
          .set("Authorization", userLogued.token);
        expect(res.statusCode).toBe(200);
      });

      test("must respond with the message 'Categori removed'", async () => {
        const userLogued = await logginUser();
        const category = await getOneElement(baseURL_category, "first");
        const id = category._id;

        const msg = "Category removed";
        const res = await api
          .delete(baseURL_category + id)
          .set("Authorization", userLogued.token);

        expect(JSON.stringify(res.body)).toBe(JSON.stringify(msg));
      });

      test("must respond with the message 'Category not found' if No category is found", async () => {
        const userLogued = await logginUser();
        const randomID = "61ed764a4c3669f448230938";
        const res = await api
          .delete(baseURL_category + randomID)
          .set("Authorization", userLogued.token);
        const msg = "Category not found";

        expect(res.body.message).toBe(msg);
      });
    });

    describe("When a bad ID is sended but have a valid token", () => {
      test("must respont 400 status code", async () => {
        const userLogued = await logginUser();
        const id = "suPerBaDid";
        const res = await api
          .delete(baseURL_category + id)
          .set("Authorization", userLogued.token);
        expect(res.statusCode).toBe(400);
      });

      test("must return a message that seid invalid ID", async () => {
        const userLogued = await logginUser();
        const id = "suPerBaDid";
        const msgEsperado = "Invalid ID";
        const res = await api
          .get(baseURL_category + id)
          .set("Authorization", userLogued.token);
        expect(res.body.message).toBe(msgEsperado);
      });
    });

    describe("When not have a JWT", () => {
      test("must respond a 401 status code", async () => {
        const category = await getOneElement(baseURL_category, "first");
        const id = category._id;

        const res = await api.delete(baseURL_category + id);

        expect(res.statusCode).toBe(401);
      });

      test("must respond an object", async () => {
        const category = await getOneElement(baseURL_category, "first");
        const id = category._id;

        const res = await api.delete(baseURL_category + id);

        expect(res.body).toBeInstanceOf(Object);
      });

      test("the respond must have a message that seid User not autorized", async () => {
        const category = await getOneElement(baseURL_category, "first");
        const id = category._id;

        const res = await api.post(baseURL_category).send({ name: "Pepe" });

        msg = "User not autorized";
        expect(res.body.Message).toBe(msg);
      });
    });
  });
});
