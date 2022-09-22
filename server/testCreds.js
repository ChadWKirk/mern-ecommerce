require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtyg4ctfr",
  api_key: "337187168292683",
  api_secret: "QgDFmej_4ndnjnPhGBKcA8w_aLw",
});

console.log(cloudinary.config().cloud_name);
console.log(cloudinary.config().api_key);
console.log(cloudinary.config().api_secret);

