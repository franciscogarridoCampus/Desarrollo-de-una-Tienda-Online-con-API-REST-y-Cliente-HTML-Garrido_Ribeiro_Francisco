const fs = require("fs");

exports.leerJSON = (ruta) => JSON.parse(fs.readFileSync(ruta, "utf-8"));
