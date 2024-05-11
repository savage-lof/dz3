const { readData } = require("../utils/data");

const allowedCors = ["http://localhost:3000", "http://localhost:3001"];

async function getAllGames(req, res, next) {
    const games = await readData("./data/games.json");
    if (!games) {
        res.status(400);
        res.send({
            status: "error",
            message: "Нет игр в базе данных. Добавьте игру."
        });
        return;
    }
    req.games = games;
    next();
}

function cors(req, res, next) {
    const { origin } = req.headers;
  
    if (allowedCors.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
    );
    next();
  }

module.exports = { 
    getAllGames,
    cors,
 };