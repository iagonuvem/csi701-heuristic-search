import { MinHeap } from "./heap";
import { Terrain } from "./terrain";

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

export function aStar(start: [number, number], goal: [number, number], map: Terrain[][], terrainCosts: Record<Terrain, number>): AStarNode[] | null {
    const openList = new MinHeap<AStarNode>();  // Fila de prioridade
    const closedList: Set<string> = new Set();  // Conjunto para armazenar nós já visitados

    const startNode = new AStarNode(start, 0, heuristic(start, goal));
    openList.insert(startNode, startNode.fCost);

    const nodeKey = (x: number, y: number) => `${x},${y}`;  // Gera uma chave única para armazenar as coordenadas no closedList

    while (!openList.isEmpty()) {
        const currentNode = openList.extractMin();

        if (!currentNode) continue;

        // Verifica se chegou ao objetivo
        if (currentNode.position[0] === goal[0] && currentNode.position[1] === goal[1]) {
            return reconstructPath(currentNode);
        }

        // Adiciona o nó atual à lista de visitados
        closedList.add(nodeKey(currentNode.position[0], currentNode.position[1]));

        const neighbors = getNeighbors(currentNode.position);
        for (const neighborPos of neighbors) {
            const [x, y] = neighborPos;

            // Verifica se o vizinho está dentro dos limites do mapa e se não é um edifício
            if (x < 0 || y < 0 || x >= map.length || y >= map[0].length || map[x][y] === 'building') {
                continue;
            }

            const terrainCost = terrainCosts[map[x][y]];  // Custo baseado no tipo de terreno
            const gCost = currentNode.gCost + terrainCost;
            const hCost = heuristic(neighborPos, goal);
            const neighborNode = new AStarNode(neighborPos, gCost, hCost, currentNode);

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

export function printPath(path: AStarNode[], map: Terrain[][], terrainCosts: Record<Terrain, number>): void {
    let totalCost = 0;

    path.forEach((node, index) => {
        const terrainType = map[node.position[0]][node.position[1]];
        const movementCost = terrainCosts[terrainType];

        console.log(`Moveu para: (${node.position[0]}, ${node.position[1]}) em ${terrainType} com o custo: ${movementCost}`);
        totalCost += movementCost;
    });

    console.log(`Custo total do caminho: ${totalCost}`);
}