"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aStar = aStar;
exports.printPath = printPath;
var terrain_1 = require("./terrain");
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
function aStar(start, goal, map) {
    var openList = [];
    var closedList = [];
    var startNode = new AStarNode(start, 0, heuristic(start, goal));
    openList.push(startNode);
    while (openList.length > 0) {
        var currentNode = openList.sort(function (a, b) { return a.fCost - b.fCost; })[0];
        if (currentNode.position[0] === goal[0] && currentNode.position[1] === goal[1]) {
            return reconstructPath(currentNode);
        }
        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);
        var neighbors = getNeighbors(currentNode.position);
        var _loop_1 = function (neighborPos) {
            var x = neighborPos[0], y = neighborPos[1];
            // Verifique se o vizinho está dentro dos limites do mapa e se não é um edifício
            if (x < 0 || y < 0 || x >= map.length || y >= map[0].length || map[x][y] === 'building') {
                return "continue";
            }
            var terrainCost = terrain_1.terrainCosts[map[x][y]]; // Custo baseado no tipo de terreno
            var gCost = currentNode.gCost + terrainCost;
            var hCost = heuristic(neighborPos, goal);
            var neighborNode = new AStarNode(neighborPos, gCost, hCost, currentNode);
            if (!closedList.some(function (node) { return node.position[0] === x && node.position[1] === y; })) {
                openList.push(neighborNode);
            }
        };
        for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
            var neighborPos = neighbors_1[_i];
            _loop_1(neighborPos);
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
function printPath(path) {
    path.forEach(function (node) {
        console.log("Mover para: (".concat(node.position[0], ", ").concat(node.position[1], ")"));
    });
}
