import { BinaryTree } from "./binaryTree.mjs";

class Heap{
    constructor() {
        this.heap = [];
    }

        push(node) {
        this.heap.push(node);
        this.heapifyUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return top;
    }

    size() {
        return this.heap.length;
    }

    heapifyUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[i].freq >= this.heap[parent].freq) break;
            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }

    heapifyDown() {
        let i = 0;
        const len = this.heap.length;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            if (left < len && this.heap[left].freq < this.heap[smallest].freq)
                smallest = left;
            if (right < len && this.heap[right].freq < this.heap[smallest].freq)
                smallest = right;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
}

export { Heap };