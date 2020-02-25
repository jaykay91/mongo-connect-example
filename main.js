const connectMongo = require("./models");
const dotenv = require("dotenv");

dotenv.config();
connectMongo();

async function main() {
  const User = require("./models/User");
  let result;

  result = await User.find();

  console.log(result);
}

main();
