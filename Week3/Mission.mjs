import { Heap } from "./heap.mjs";

// class TreeNode {
//     constructor(char, freq, left = null, right = null) {
//         this.char = char;
//         this.freq = freq;
//         this.left = left;
//         this.right = right;
//     }
// }

// // 최소 힙 구현 (문자 빈도 기준)
// class MinHeap {
//     constructor() {
//         this.heap = [];
//     }

//     push(node) {
//         this.heap.push(node);
//         this._heapifyUp();
//     }

//     pop() {
//         if (this.heap.length === 1) return this.heap.pop();
//         const top = this.heap[0];
//         this.heap[0] = this.heap.pop();
//         this._heapifyDown();
//         return top;
//     }

//     size() {
//         return this.heap.length;
//     }

//     _heapifyUp() {
//         let i = this.heap.length - 1;
//         while (i > 0) {
//             const parent = Math.floor((i - 1) / 2);
//             if (this.heap[i].freq >= this.heap[parent].freq) break;
//             [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
//             i = parent;
//         }
//     }

//     _heapifyDown() {
//         let i = 0;
//         const len = this.heap.length;
//         while (true) {
//             let smallest = i;
//             const left = 2 * i + 1;
//             const right = 2 * i + 2;
//             if (left < len && this.heap[left].freq < this.heap[smallest].freq)
//                 smallest = left;
//             if (right < len && this.heap[right].freq < this.heap[smallest].freq)
//                 smallest = right;
//             if (smallest === i) break;
//             [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
//             i = smallest;
//         }
//     }
// }

// class HuffmanCoding {
//     constructor() {
//         this.codes = new Map(); // 문자 → 코드
//     }

//     compress(str) {
//         const freqMap = new Map();

//         // 1. 문자 빈도수 계산
//         for (let ch of str) {
//             freqMap.set(ch, (freqMap.get(ch) || 0) + 1);
//         }

//         // 2. 최소 힙에 노드 삽입
//         const heap = new MinHeap();
//         const heap = new Heap();
//         for (let [char, freq] of freqMap.entries()) {
//             heap.push(new TreeNode(char, freq));
//         }

//         // 3. Huffman 트리 생성
//         while (heap.size() > 1) {
//             const left = heap.pop();
//             const right = heap.pop();
//             const merged = new TreeNode(null, left.freq + right.freq, left, right);
//             heap.push(merged);
//         }

//         const root = heap.pop();

//         // 4. 재귀적으로 코드 생성
//         this._buildCodes(root, "");

//         // 5. Map을 배열로 변환해 반환
//         return Array.from(this.codes.entries());
//     }

//     _buildCodes(node, code) {
//         if (!node) return;
//         if (node.char !== null) {
//             this.codes.set(node.char, code);
//             return;
//         }
//         this._buildCodes(node.left, code + '0');
//         this._buildCodes(node.right, code + '1');
//     }
// }

// const huffman = new HuffmanCoding();
// const str = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.";

// const result = huffman.compress(str);
// console.log(result);