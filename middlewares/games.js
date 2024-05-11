const { readData } = require("../utils/data");

const allowedCors = [
    'https://practicum.yandex.ru',
    'https://students-projects.ru',
    'http://localhost:3000'
  ];

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
    
    if (allowedCors.includes(origin)) { // Если это наш друг
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    next();
}

module.exports = { 
    getAllGames,
    cors,
 };