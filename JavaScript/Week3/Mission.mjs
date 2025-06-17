import { BinaryTree } from "./binaryTree.mjs";
import { Heap } from "./heap.mjs";

class HuffmanCoding {
    constructor() {
        this.codes = new Map(); 
    }

    compress(str) {
        const freqMap = new Map();

        for (let ch of str) {
            freqMap.set(ch, (freqMap.get(ch) || 0) + 1);
        }

        const heap = new Heap();
        for (let [char, freq] of freqMap.entries()) {
            heap.push(new BinaryTree(char, freq));
        }

        while (heap.size() > 1) {
            const left = heap.pop();
            const right = heap.pop();
            const merged = new BinaryTree(null, left.freq + right.freq, left, right);
            heap.push(merged);
        }

        const root = heap.pop();

        this.buildCodes(root, "");

        return Array.from(this.codes.entries());
    }

    buildCodes(node, code) {
        if (!node) return;
        if (node.char !== null) {
            this.codes.set(node.char, code);
            return;
        }
        this.buildCodes(node.left, code + '0');
        this.buildCodes(node.right, code + '1');
    }
}

const huffman = new HuffmanCoding();
const str = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.";

const result = huffman.compress(str);
console.log(result);