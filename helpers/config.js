// JWT for dev mode
module.exports.jwtDev = "dev-secret";

// MongoDB adress for dev mode
module.exports.mongoAdress = "mongodb://localhost:27017/nkeeperdb";

//cors options configuration
module.exports.corsOrigins = [
  "http://localhost:8080",
  "https://maruost.github.io",
  "http://localhost:8000/",
  "http://localhost:8000/signin",
  "http://localhost:3000/",
];
