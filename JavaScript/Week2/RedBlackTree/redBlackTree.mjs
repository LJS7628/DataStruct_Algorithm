import { BinaryTree, RED, BLACK } from "./binaryTree.mjs";

class RedBlackTree{
    constructor(rootNode = null){
        this.root = rootNode;
    }

    search(targetData){
        let currentNode = this.root;

        while(currentNode != null){
            if(currentNode.getData() == targetData){
                return currentNode;
            } else if(currentNode.getData() > targetData){
                currentNode = currentNode.getLeftSubTree();
            } else {
                currentNode = currentNode.getRightSubTree();
            }
        }

        return null;
    }

    rotateLeft(node){
        let parent = node.getParent();
        let rightChild = node.getRightSubTree();

        node.setRightSubTree(rightChild.getLeftSubTree());

        if(rightChild.getLeftSubTree() != null){
            rightChild.getLeftSubTree().setParent(node);
        }

        rightChild.setLeftSubTree(node);
        node.setParent(rightChild);

        this.replaceParentsChild(parent, node, rightChild);
    }

    rotateRight(node){
        let parent = node.getParent();
        let leftChild = node.getLeftSubTree();

        node.setLeftSubTree(leftChild.getRightSubTree());

        if(leftChild.getRightSubTree() != null){
            leftChild.getRightSubTree().setParent(node);
        }

        leftChild.setRightSubTree(node);
        node.setParent(leftChild);

        this.replaceParentsChild(parent, node, leftChild);
    }

    replaceParentsChild(parent, oldChild, newChild){
        if(parent == null){
            this.root = newChild;
        }else if(parent.getLeftSubTree() == oldChild){
            parent.setLeftSubTree(newChild);
        }else if(parent.getRightSubTree() == oldChild){
            parent.setRightSubTree(newChild);
        }

        if(newChild != null){
            newChild.setParent(parent);
        }
    }

    insert(data){
        let current = this.root;
        let parent = null;

        while(current != null){
            parent = current;
            if(data < current.getData()){
                current = current.getLeftSubTree();
            }else if(data > current.getData()){
                current = current.getRightSubTree();
            }else{
                return;
            }
        }

        let newNode = new BinaryTree(data);
        if(parent == null){
            this.root = newNode;
        }else if(data < parent.getData()){
            parent.setLeftSubTree(newNode);
        }else{
            parent.setRightSubTree(newNode);
        }

        newNode.setParent(parent);
        this.rebalanceAfterInsertion(newNode);
    }

    rebalanceAfterInsertion(node){
        let parent = node.getParent();

        if(parent == null){
            node.color = BLACK;
            return;
        }

        if(parent.color == BLACK){
            return;
        }

        let uncle = this.getUncle(parent);
        let grandParent = parent.getParent();
        if(uncle != null && uncle.color == RED){
            parent.color = BLACK;
            uncle.color = BLACK;
            grandParent.color = RED;
            this.rebalanceAfterInsertion(grandParent);
        }else if(this.isBlack(uncle) == true){
            if(grandParent.getRightSubTree() == parent && parent.getLeftSubTree() == node){
                this.rotateRight(parent);
                this.rotateLeft(grandParent);
                node.color = BLACK;
                grandParent.color = RED;
            }else if(grandParent.getLeftSubTree() == parent && parent.getRightSubTree() == node){
                this.rotateLeft(parent);
                this.rotateRight(grandParent);
                node.color = BLACK;
                grandParent.color = RED;
            }else if(grandParent.getRightSubTree() == parent && parent.getRightSubTree() == node){
                this.rotateLeft(grandParent);
                parent.color = BLACK;
                grandParent.color = RED;
            }else if(grandParent.getLeftSubTree() == parent && parent.getLeftSubTree() == node){
                this.rotateRight(grandParent);
                parent.color = BLACK;
                grandParent.color = RED;
            }
        }
    }

    getUncle(parent){
        let grandParent = parent.getParent();
        if(grandParent.getLeftSubTree() == parent){
            return grandParent.getRightSubTree();
        }else if(grandParent.getRightSubTree() == parent){
            return grandParent.getLeftSubTree();
        }

        return null;
    }

    isBlack(node){
        return node == null || node.color == BLACK;
    }
}

class NilNode extends BinaryTree{
    constructor(){
        super(0);
        this.color = BLACK;
    }
}

let rbTree = new RedBlackTree();
rbTree.insert(17);
rbTree.insert(9);
rbTree.insert(19);
rbTree.insert(75);
rbTree.insert(85);

console.log(rbTree.root);

if(rbTree.root){
    rbTree.root.inOrderTraversal(rbTree.root);
}

