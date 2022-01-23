const app = require("./app");

const main = async () => {
  app.listen(app.get("port"));  
  console.log(`App running on port ${app.get("port")}`)
};

main();
