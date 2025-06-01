import { BinaryTree } from "./binaryTree.mjs";

export class AVLTree{
    constructor(rootNode = null){
        this.root = rootNode;
    }

    //찾을 데이터 노드를 반환
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

    // 노드의 높이를 반환
    getHeight(node){
        if(node == null){
            return 0;
        }else{
            return node.height;
        }
    }

    updateHeight(node){

        // 해당 노드의 왼쪽 자식의 높이를 저장
        let leftChildHeight = this.getHeight(node.getLeftSubTree());

        // 해당 노드의 오른쪽 자식의 높이를 저장
        let rightChildHeight = this.getHeight(node.getRightSubTree());

        // 왼쪽과 오른쪽 중 가장 높은 높이 + 1를 해당 노드의 높이로 설정
        node.height = Math.max(leftChildHeight, rightChildHeight) + 1;
    }

    getBalanceFactor(node){
        // 왼쪽 서브 트리와 오른쪽 서브 트리의 차를 구함 
        return this.getHeight(node.getLeftSubTree()) - this.getHeight(node.getRightSubTree());
    }

    //LL 회전
    rotateLeft(node){
        //node => 서브트리의 루트라고 가정
        //node의 오른쪽 자식의 왼쪽 서브트리를 node의 오른쪽 자식으로 연결
        //오른쪽 자식의 왼쪽 자식으로 node를 재설정
        let childNode = node.getRightSubTree();
        node.setRightSubTree(childNode.getLeftSubTree());
        childNode.setLeftSubTree(node);

        // 높이 재계산
        this.updateHeight(node);
        this.updateHeight(childNode);

        return childNode;
    }

    //RR 회전
    rotateRight(node){
        //node => 서브트리의 루트라고 가정
        //node의 왼쪽 자식의 오른쪽 서브트리를 node의 왼쪽 자식으로 연결
        //왼쪽 자식의 오른쪽 서브트리로 node를 재설정 
        let childNode = node.getLeftSubTree();
        node.setLeftSubTree(childNode.getRightSubTree());
        childNode.setRightSubTree(node);

        // 높이 재계산
        this.updateHeight(node);
        this.updateHeight(childNode);

        return childNode;
    }

    //AVL 트리 구조를 유지하기 위한 회전 적용
    rotation(targetNode, data){
        let balanceFactor = this.getBalanceFactor(targetNode);
        let isRootNode = false;

        // 타겟노드가 최상위 루트인 경우
        if(targetNode == this.root){
            isRootNode = true;
        }

        //LL 회전이 필요한 경우
        if(balanceFactor < -1 && data > targetNode.getRightSubTree().getData()){
            targetNode = this.rotateLeft(targetNode);
         
        //RR 회전이 필요한 경우    
        }else if(balanceFactor > 1 && data < targetNode.getLeftSubTree().getData()){
            targetNode = this.rotateRight(targetNode);

        // LR 회전이 필요한 경우    
        }else if(balanceFactor > 1 && data > targetNode.getLeftSubTree().getData()){
            targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree()));
            targetNode = this.rotateRight(targetNode);
         
        // RL 회전이 필요한 경우    
        }else if(balanceFactor < -1 && data < targetNode.getRightSubTree().getData()){
            targetNode.setRightSubTree(this.rotateRight(targetNode.getRightSubTree()));
            targetNode = this.rotateLeft(targetNode);
        }

        // 루트 노드 재설정
        if(isRootNode){
            this.root = targetNode;
        }

        return targetNode;
    }

    // 균형을 무너트리는 노드를 찾는 함수
    getUnBalanceNode(targetRootNode, unBalanceNode = null){
        if(targetRootNode.getLeftSubTree() == null && targetRootNode.getRightSubTree() == null){
            unBalanceNode = targetRootNode;
            return unBalanceNode;
        }

        let balanceFactor = this.getBalanceFactor(targetRootNode);

        // 왼쪽이 더 깊은 경우
        if(balanceFactor > 0){
            unBalanceNode = this.getUnBalanceNode(targetRootNode.getLeftSubTree(), unBalanceNode);
        
        // 오른쪽이 더 깊은 경우
        }else if(balanceFactor < 0){
            unBalanceNode = this.getUnBalanceNode(targetRootNode.getRightSubTree(), unBalanceNode);
        
        // 양쪽 깊이가 동일한 경우 오른쪽으로 재귀
        }else{
            unBalanceNode = targetRootNode.getRightSubTree();
        }

        return unBalanceNode;
    }

    insert(targetRootNode, data){
        if(targetRootNode == null){
            targetRootNode = new BinaryTree(data);
        }

        // 루트가 존재하지 않을 때 루트 설정
        if(this.root == null){
            this.root = targetRootNode;
        
        // 타겟노드위치에 삽입    
        }else if(targetRootNode.getData() == data){
            return targetRootNode;
        
        //왼쪽에 삽입  
        }else if(targetRootNode.getData() > data){
            targetRootNode.setLeftSubTree(this.insert(targetRootNode.getLeftSubTree(), data));
        //오른쪽에 삽입
        }else{
            targetRootNode.setRightSubTree(this.insert(targetRootNode.getRightSubTree(), data));
        }

        //높이 재계산 및 회전을 통해 균형 유지 
        this.updateHeight(targetRootNode);
        targetRootNode = this.rotation(targetRootNode, data);

        return targetRootNode;
    }

    remove(targetRootNode, data, parentNode = null){
        if(targetRootNode.getData() > data && targetRootNode.getLeftSubTree() != null){
            targetRootNode.setLeftSubTree(this.remove(targetRootNode.getLeftSubTree(), data, targetRootNode));
        }else if(targetRootNode.getData() < data && targetRootNode.getRightSubTree() != null){
            targetRootNode.setRightSubTree(this.remove(targetRootNode.getRightSubTree(), data, targetRootNode));
        }else if(targetRootNode.getData() == data){
            targetRootNode = this.removeHelper(targetRootNode, data, parentNode);

            if(parentNode == null && targetRootNode != null){
                this.updateHeight(targetRootNode);
                let unBalanceNode = this.getUnBalanceNode(targetRootNode);
                targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());
            }

            return targetRootNode;
        }

        this.updateHeight(targetRootNode);
        let unBalanceNode = this.getUnBalanceNode(targetRootNode);
        targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());
        return targetRootNode;
    }

    removeHelper(deletingNode, data, parentNode){
        let fakeParentRootNode = new BinaryTree(0);
        fakeParentRootNode.setRightSubTree(this.root);

        if(parentNode == null){
            parentNode = fakeParentRootNode;
        }

        let deletingNodeChild = null;
        if(deletingNode.getLeftSubTree() == null && deletingNode.getRightSubTree() == null){
            if(parentNode.getLeftSubTree() == deletingNode){
                parentNode.removeLeftSubTree();
            } else {
                parentNode.removeRightSubTree();
            }
        }else if(deletingNode.getLeftSubTree() == null || deletingNode.getRightSubTree() == null){
            if(deletingNode.getLeftSubTree() != null){
                deletingNodeChild = deletingNode.getLeftSubTree();
            }else{
                deletingNodeChild = deletingNode.getRightSubTree();
            }

            if(parentNode.getLeftSubTree() == deletingNode){
                parentNode.setLeftSubTree(deletingNodeChild);
            }else{
                parentNode.setRightSubTree(deletingNodeChild);
            }
        }else{
            let replacingNode = deletingNode.getLeftSubTree();
            let replacingNodeParent = deletingNode;

            while(replacingNode.getRightSubTree() != null){
                replacingNodeParent = replacingNode;
                replacingNode = replacingNode.getRightSubTree();
            }

            let deletingNodeData = deletingNode.getData();
            deletingNode.setData(replacingNode.getData());

            if(replacingNodeParent.getLeftSubTree() == replacingNode){
                replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());

            }else{
                replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
            }

            deletingNodeChild = deletingNode;
        }

        if(fakeParentRootNode.getRightSubTree() != this.root){
            this.root = fakeParentRootNode.getRightSubTree();
        }

        return deletingNodeChild;
    }
}