import * as fs from 'fs';
import { aStar, printPath } from './node';
import { Terrain, terrainCosts } from './terrain';

let map_path = process.argv[2];
if (!map_path) {
    console.error('Por favor, forneça o caminho para o mapa inicial. Ex: mapa.json');
    process.exit(1);
}

// Função para carregar o arquivo JSON
function loadConfig(filePath: string): { start: [number, number], goal: [number, number], map: Terrain[][] } {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}
  
// Carregar o arquivo de configuração
const config = loadConfig(map_path);

const path = aStar(config.start, config.goal, config.map, terrainCosts);
if (path) {
    printPath(path, config.map, terrainCosts);
} else {
    console.log("Caminho não encontrado!");
}
