import { BinaryTree } from "./BinaryTree.mjs";

let node1 = new BinaryTree(1);
let node2 = new BinaryTree(2);
let node3 = new BinaryTree(3);
let node4 = new BinaryTree(4);
let node5 = new BinaryTree(5);
let node6 = new BinaryTree(6);
let node7 = new BinaryTree(7);


node1.SetLeftSubTree(node2);
node1.SetRightSubTree(node3);
node2.SetLeftSubTree(node4);
node2.SetRightSubTree(node5);
node3.SetLeftSubTree(node6);
node3.SetRightSubTree(node7);

console.log("PreOrder\n");
node1.PreOrderTraversal(node1);

console.log("InOrder\n");
node1.InOrderTraversal(node1);

console.log("PostOrder\n");
node1.PostOrderTraversal(node1);


