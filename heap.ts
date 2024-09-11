// Implementação básica de um Min-Heap para a fila de prioridade
export class MinHeap<T> {
    private heap: { node: T, fCost: number }[] = [];

    // Adiciona um nó ao heap
    insert(node: T, fCost: number): void {
        this.heap.push({ node, fCost });
        this.bubbleUp();
    }

    // Remove e retorna o nó com o menor fCost
    extractMin(): T | null {
        if (this.heap.length === 0) return null;
        const minNode = this.heap[0].node;
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return minNode;
    }

    // Sobe um elemento no heap até sua posição correta
    private bubbleUp(): void {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];

            if (element.fCost >= parent.fCost) break;

            this.heap[index] = parent;
            index = parentIndex;
        }

        this.heap[index] = element;
    }

    // Desce um elemento no heap até sua posição correta
    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild: { node: T, fCost: number } | null = null;
            let rightChild: { node: T, fCost: number } | null = null;
            let swap:any = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.fCost < element.fCost) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.fCost < element.fCost) ||
                    (swap !== null && rightChild.fCost < leftChild!.fCost)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            index = swap;
        }

        this.heap[index] = element;
    }

    // Verifica se o heap está vazio
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}