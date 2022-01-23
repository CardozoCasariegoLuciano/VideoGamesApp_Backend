const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const baseURL_category = "/api/category/";
const baseURL_videogames = "/api/videogames/";

const initialState_category = [
  { name: "rol games" },
  { name: "shoter games" },
  { name: "estrategy games" },
];

const initialState_videogames = [
//sin el campo category, eso se lo asigno en el vidogames.test.js
  {
    name:"grepolis",
    description: "Alto juego viejaa",
    price: 123123,
    quantity: 2,
  },
  {
    name:"Horizont zero down",
    description: "Alto juego viejaa",
    price: 50,
    quantity: 7,
  }
];


const allCategories = async() => {
  return await api.get(baseURL_category)
} 

const allVideogames = async() => {
  return await api.get(baseURL_videogames)
} 


const getOneCategori = async(text) => {

  const category = await api.get(baseURL_category)
  if(text === "first"){
    return category.body[0]
  }

  if(text === "random"){
    const rand = Math.floor(Math.random() * category.body.length)
    return category.body[rand]
  }

}

module.exports = {
  api,
  initialState_category,
  initialState_videogames,
  allCategories,
  allVideogames,
  baseURL_category,
  baseURL_videogames,
  getOneCategori,
};
