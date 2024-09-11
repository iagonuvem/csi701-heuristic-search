"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinHeap = void 0;
// Implementação básica de um Min-Heap para a fila de prioridade
var MinHeap = /** @class */ (function () {
    function MinHeap() {
        this.heap = [];
    }
    // Adiciona um nó ao heap
    MinHeap.prototype.insert = function (node, fCost) {
        this.heap.push({ node: node, fCost: fCost });
        this.bubbleUp();
    };
    // Remove e retorna o nó com o menor fCost
    MinHeap.prototype.extractMin = function () {
        if (this.heap.length === 0)
            return null;
        var minNode = this.heap[0].node;
        var end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return minNode;
    };
    // Sobe um elemento no heap até sua posição correta
    MinHeap.prototype.bubbleUp = function () {
        var index = this.heap.length - 1;
        var element = this.heap[index];
        while (index > 0) {
            var parentIndex = Math.floor((index - 1) / 2);
            var parent_1 = this.heap[parentIndex];
            if (element.fCost >= parent_1.fCost)
                break;
            this.heap[index] = parent_1;
            index = parentIndex;
        }
        this.heap[index] = element;
    };
    // Desce um elemento no heap até sua posição correta
    MinHeap.prototype.bubbleDown = function () {
        var index = 0;
        var length = this.heap.length;
        var element = this.heap[0];
        while (true) {
            var leftChildIndex = 2 * index + 1;
            var rightChildIndex = 2 * index + 2;
            var leftChild = null;
            var rightChild = null;
            var swap = null;
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.fCost < element.fCost) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild.fCost < element.fCost) ||
                    (swap !== null && rightChild.fCost < leftChild.fCost)) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null)
                break;
            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    };
    // Verifica se o heap está vazio
    MinHeap.prototype.isEmpty = function () {
        return this.heap.length === 0;
    };
    return MinHeap;
}());
exports.MinHeap = MinHeap;
