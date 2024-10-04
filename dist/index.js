"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var node_1 = require("./node");
var terrain_1 = require("./terrain");
var map_path = process.argv[2];
if (!map_path) {
    console.error('Por favor, forneça o caminho para o mapa inicial. Ex: mapa.json');
    process.exit(1);
}
// Função para carregar o arquivo JSON
function loadConfig(filePath) {
    var data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}
// Carregar o arquivo de configuração
var config = loadConfig(map_path);
var path = (0, node_1.aStar)(config.start, config.goal, config.map, terrain_1.terrainCosts);
console.log('node', path);
if (path) {
    (0, node_1.printPath)(path, config.map, terrain_1.terrainCosts);
}
else {
    console.log("Caminho não encontrado!");
}
