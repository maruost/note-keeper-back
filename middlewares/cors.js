const { corsOrigins } = require("../helpers/config");

module.exports.corsOptions = {
  origin: corsOrigins,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "origin", "x-access-token"],
  credentials: true,
};
