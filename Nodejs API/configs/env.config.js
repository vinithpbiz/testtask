require("dotenv").config({path:'./.env'});

module.exports = {
    server: {
        PORT: 3000,
        NODE_ENVIR: "development", // enum: ["development", "production", "local"]
        domain: "http://localhost:3000"
    },
    secret: {
        SECRET: process.env.SECRET
    },
    database:{
        DBURI:process.env.DBURI
    },
    jwt:{
      SECTER_ACCESS_TOKEN: process.env.JWT_SECTER_ACCESS_TOKEN,
      SECTER_REFRESH_TOKEN: process.env.JWT_SECTER_REFRESH_TOKEN
    }
};