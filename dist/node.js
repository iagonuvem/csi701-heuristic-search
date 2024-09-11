"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aStar = aStar;
exports.printPath = printPath;
var heap_1 = require("./heap");
var AStarNode = /** @class */ (function () {
    function AStarNode(position, gCost, hCost, parent) {
        if (parent === void 0) { parent = null; }
        this.position = position;
        this.gCost = gCost;
        this.hCost = hCost;
        this.parent = parent;
    }
    Object.defineProperty(AStarNode.prototype, "fCost", {
        get: function () {
            return this.gCost + this.hCost;
        },
        enumerable: false,
        configurable: true
    });
    return AStarNode;
}());
function aStar(start, goal, map, terrainCosts) {
    var openList = new heap_1.MinHeap(); // Fila de prioridade
    var closedList = new Set(); // Conjunto para armazenar nós já visitados
    var startNode = new AStarNode(start, 0, heuristic(start, goal));
    openList.insert(startNode, startNode.fCost);
    var nodeKey = function (x, y) { return "".concat(x, ",").concat(y); }; // Gera uma chave única para armazenar as coordenadas no closedList
    while (!openList.isEmpty()) {
        var currentNode = openList.extractMin();
        if (!currentNode)
            continue;
        // Verifica se chegou ao objetivo
        if (currentNode.position[0] === goal[0] && currentNode.position[1] === goal[1]) {
            return reconstructPath(currentNode);
        }
        // Adiciona o nó atual à lista de visitados
        closedList.add(nodeKey(currentNode.position[0], currentNode.position[1]));
        var neighbors = getNeighbors(currentNode.position);
        for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
            var neighborPos = neighbors_1[_i];
            var x = neighborPos[0], y = neighborPos[1];
            // Verifica se o vizinho está dentro dos limites do mapa e se não é um edifício
            if (x < 0 || y < 0 || x >= map.length || y >= map[0].length || map[x][y] === 'building') {
                continue;
            }
            var terrainCost = terrainCosts[map[x][y]]; // Custo baseado no tipo de terreno
            var gCost = currentNode.gCost + terrainCost;
            var hCost = heuristic(neighborPos, goal);
            var neighborNode = new AStarNode(neighborPos, gCost, hCost, currentNode);
            // Se o vizinho já foi visitado, ignore-o
            if (closedList.has(nodeKey(x, y))) {
                continue;
            }
            // Adiciona o vizinho à fila de prioridade se ele não está na closedList
            openList.insert(neighborNode, neighborNode.fCost);
        }
    }
    return null; // Caminho não encontrado
}
// Funções auxiliares
function heuristic(pos1, pos2) {
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]); // Distância de Manhattan
}
function getNeighbors(position) {
    var x = position[0], y = position[1];
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ];
}
function reconstructPath(node) {
    var path = [];
    var currentNode = node;
    while (currentNode !== null) {
        path.push(currentNode);
        currentNode = currentNode.parent;
    }
    return path.reverse(); // Reverte o caminho para que seja do início ao fim
}
function printPath(path, map, terrainCosts) {
    var totalCost = 0;
    path.forEach(function (node, index) {
        var terrainType = map[node.position[0]][node.position[1]];
        var movementCost = terrainCosts[terrainType];
        console.log("Moveu para: (".concat(node.position[0], ", ").concat(node.position[1], ") em ").concat(terrainType, " com o custo: ").concat(movementCost));
        totalCost += movementCost;
    });
    console.log("Custo total do caminho: ".concat(totalCost));
}
