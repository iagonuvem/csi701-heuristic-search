import { Terrain, terrainCosts } from "./terrain";

class AStarNode {
    public position: [number, number];
    public gCost: number;
    public hCost: number;
    public parent: AStarNode | null;

    constructor(position: [number, number], gCost: number, hCost: number, parent: AStarNode | null = null) {
        this.position = position;
        this.gCost = gCost;
        this.hCost = hCost;
        this.parent = parent;
    }

    get fCost(): number {
        return this.gCost + this.hCost;
    }
}

export function aStar(start: [number, number], goal: [number, number], map: Terrain[][]): AStarNode[] | null {
    const openList: AStarNode[] = [];
    const closedList: AStarNode[] = [];

    const startNode = new AStarNode(start, 0, heuristic(start, goal));
    openList.push(startNode);

    while (openList.length > 0) {
        const currentNode = openList.sort((a, b) => a.fCost - b.fCost)[0];

        if (currentNode.position[0] === goal[0] && currentNode.position[1] === goal[1]) {
            return reconstructPath(currentNode);
        }

        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        const neighbors = getNeighbors(currentNode.position);
        for (const neighborPos of neighbors) {
            const [x, y] = neighborPos;

            // Verifique se o vizinho está dentro dos limites do mapa e se não é um edifício
            if (x < 0 || y < 0 || x >= map.length || y >= map[0].length || map[x][y] === 'building') {
                continue;
            }

            const terrainCost = terrainCosts[map[x][y]];  // Custo baseado no tipo de terreno
            const gCost = currentNode.gCost + terrainCost;
            const hCost = heuristic(neighborPos, goal);
            const neighborNode = new AStarNode(neighborPos, gCost, hCost, currentNode);

            if (!closedList.some(node => node.position[0] === x && node.position[1] === y)) {
                openList.push(neighborNode);
            }
        }
    }

    return null; // Caminho não encontrado
}


// Funções auxiliares
function heuristic(pos1: [number, number], pos2: [number, number]): number {
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]); // Distância de Manhattan
}

function getNeighbors(position: [number, number]): [number, number][] {
    const [x, y] = position;
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ];
}

function reconstructPath(node: AStarNode): AStarNode[] {
    const path: AStarNode[] = [];
    let currentNode: AStarNode | null = node;

    while (currentNode !== null) {
        path.push(currentNode);
        currentNode = currentNode.parent;
    }

    return path.reverse(); // Reverte o caminho para que seja do início ao fim
}

export function printPath(path: AStarNode[]): void {
    path.forEach((node) => {
        console.log(`Move to: (${node.position[0]}, ${node.position[1]})`);
    });
}