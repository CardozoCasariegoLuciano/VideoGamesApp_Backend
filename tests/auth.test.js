const {
  api,
  baseURL_auth,
  initialState_auth,
} = require("./tests-helpers/helper");
const User = require("../models/user.model");
const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of initialState_auth) {
    const hashPass = await User.encriptPassword(user.password);

    const newuser = new User({
      ...user,
      password: hashPass,
    });
    await newuser.save();
  }
});

describe("AUTH", () => {
  describe("api/auth/register", () => {
    describe("When all data is OK", () => {
      const registerData = {
        name: "pepe",
        email: "pepe@email.com",
        password: "123123",
        repitedPassword: "123123",
      };

      test("must return a 200 status code", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(registerData);
        expect(resp.statusCode).toBe(200);
      });

      test("must return an object", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(registerData);
        expect(resp.body).toBeInstanceOf(Object);
        expect(resp.body).not.toBeInstanceOf(Array);
      });

      test("must return the new user", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(registerData);

        expect(resp.body.name).toBe(registerData.name);
        expect(resp.body.email).toBe(registerData.email);
        expect(resp.body.password).toBeDefined();
        expect(resp.body.role).toBe("0");
        expect(resp.body.inventory).toEqual([]);
      });

      test("must return the new user's password encripted", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(registerData);

        expect(resp.body.password).not.toBe(registerData.password);
      });

      test("must add the new user into de DB", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(registerData);

        const db = await User.find();

        expect(db).toHaveLength(initialState_auth.length + 1);
      });
    });

    describe("When a email is already used", () => {
      const repitedUser = {
        name: "test",
        email: "test@test.com",
        password: "123",
        repitedPassword: "123",
      };

      test("must return a 400 status code ", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(repitedUser);

        expect(resp.statusCode).toBe(400);
      });

      test("must return a messaje thta seid that mail y already used", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(repitedUser);

        const msg = {
          message: "That mail is already used",
        };

        expect(resp.body).toStrictEqual(msg);
      });

      test("Mustn't add a new user", async () => {
        const resp = await api
          .post(baseURL_auth + "register")
          .send(repitedUser);

        const db = await User.find();

        expect(db).toHaveLength(initialState_auth.length);
      });
    });

    describe("When passwords dont match", () => {
      const badPass = {
        name: "pepe",
        email: "pepe@email.com",
        password: "123",
        repitedPassword: "123123",
      };

      test("Must respond with 400 status code", async () => {
        const resp = await api.post(baseURL_auth + "register").send(badPass);

        expect(resp.statusCode).toBe(400);
      });

      test("Must return a message that seid it", async () => {
        const resp = await api.post(baseURL_auth + "register").send(badPass);

        const msg = {
          message: "Passwords don't match",
        };

        expect(resp.body).toStrictEqual(msg);
      });

      test("Mustn't add a new user", async () => {
        const resp = await api.post(baseURL_auth + "register").send(badPass);

        const db = await User.find();

        expect(db).toHaveLength(initialState_auth.length);
      });
    });

    describe("When a wrong email is sended", () => {
      const bademail = {
        name: "pepe",
        email: "pepecom",
        password: "123123",
        repitedPassword: "123123",
      };

      test("Must respond 400 status code", async () => {
        const resp = await api.post(baseURL_auth + "register").send(bademail);
        expect(resp.statusCode).toBe(400);
      });

      test("must respotd with a messaje", async () => {
        const resp = await api.post(baseURL_auth + "register").send(bademail);

        const msg = {
          message: "No valid Email",
        };

        expect(resp.body).toStrictEqual(msg);
      });

      test("Mustn't add a new user", async () => {
        const resp = await api.post(baseURL_auth + "register").send(bademail);

        const db = await User.find();

        expect(db).toHaveLength(initialState_auth.length);
      });
    });
  });

  describe("api/auth/login", () => {
    describe("When all data is OK", () => {
      const loginData = {
        email: initialState_auth[0].email,
        password: initialState_auth[0].password,
      };

      test("must respond a 200 status code", async () => {
        const resp = await api.post(baseURL_auth + "login").send(loginData);
        expect(resp.statusCode).toBe(200);
      });

      test("must return a token and user data", async () => {
        const resp = await api.post(baseURL_auth + "login").send(loginData);

        expect(resp.body.token).toBeDefined();
        expect(resp.body.user).toBeDefined();
      });
    });

    describe("When a user is not registered and/or wrong pass", () => {
      const loginData = {
        email: "123@dasd.com",
        password: "fakePss",
      };

      test("must respond 400 status code", async () => {
        const resp = await api.post(baseURL_auth + "login").send(loginData);

        expect(resp.statusCode).toBe(400);
      });

      test("must respond a msg wrong email or passowrd", async () => {
        const resp = await api.post(baseURL_auth + "login").send(loginData);

        const msg = { message: "Wrong email or password" };

        expect(resp.body).toStrictEqual(msg);
      });
    });

    describe("When a not valid email is sened", () => {
      const bademail = {
        email: "pepecom",
        password: "123123",
      };

      test("Must respond 400 status code", async () => {
        const resp = await api.post(baseURL_auth + "login").send(bademail);
        expect(resp.statusCode).toBe(400);
      });

      test("must respond with a messaje", async () => {
        const resp = await api.post(baseURL_auth + "login").send(bademail);

        const msg = {
          message: "No valid Email",
        };

        expect(resp.body).toStrictEqual(msg);
      });
    });
  });
});
