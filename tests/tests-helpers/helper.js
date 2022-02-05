const supertest = require("supertest");
const app = require("../../app");

const api = supertest(app);

const baseURL_category = "/api/category/";
const baseURL_videogames = "/api/videogames/";
const baseURL_auth = "/api/auth/"

const initialState_category = [
  { name: "rol games" },
  { name: "shoter games" },
  { name: "estrategy games" },
];

const initialState_videogames = [
  //sin el campo category, eso se lo asigno en el vidogames.test.js
  {
    name: "grepolis",
    description: "Alto juego viejaa",
    price: 123123,
    quantity: 2,
  },
  {
    name: "Horizont zero down",
    description: "Alto juego viejaa",
    price: 50,
    quantity: 7,
  },
];


const initialState_auth = [
  {
      name: "test",
      email: "test@test.com",
      password: "123",
      repitedPassword: "123",
  }
]


const logginUser = async () => {
  const logindata = {
    email: initialState_auth[0].email,
    password: initialState_auth[0].password,
  };
  const user = await api.post("/api/auth/login").send(logindata);
  return user.body;
};


const allDBElements = async (baseURL) => {
  return await api.get(baseURL);
};

const getOneElement = async (baseURL, text) => {
  const category = await api.get(baseURL);
  if (text === "first" || !text) {
    return category.body[0];
  }

  if (text === "random") {
    const rand = Math.floor(Math.random() * category.body.length);
    return category.body[rand];
  }
};

module.exports = {
  api,
  initialState_category,
  initialState_videogames,
  initialState_auth,
  baseURL_category,
  baseURL_videogames,
  baseURL_auth,
  logginUser,
  allDBElements,
  getOneElement,
};
