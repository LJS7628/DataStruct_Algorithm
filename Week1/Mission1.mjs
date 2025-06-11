import { AVLTree } from "./avlTree.mjs"

class GabageCollector{

   constructor() {
       this.freeMemoryTree = new AVLTree();
    }

    insertFreeMemory(size) {
        this.freeMemoryTree.root = this.freeMemoryTree.insert(this.freeMemoryTree.root, size);
    }

    searchFreeMemory(size) {

        let resultNode = this.freeMemoryTree.search(size);

        if (resultNode != null) {
            return resultNode; 
        }

        let current = this.freeMemoryTree.root;
        let candidate = null;

        while (current != null) {
            if (current.getData() >= size) {
                candidate = current;
                current = current.getLeftSubTree();
            } else {
                current = current.getRightSubTree();
            }
        }

        return candidate; 
    }

    releaseFreeMemory(size) {
        this.freeMemoryTree.root = this.freeMemoryTree.remove(this.freeMemoryTree.root, size);
    }

}

const gc = new GabageCollector();
console.log("========== 빈 메모리 영역 초기화 ==========");
gc.insertFreeMemory(64); // 빈 64바이트 삽입
gc.insertFreeMemory(48); // 빈 48바이트 삽입
gc.insertFreeMemory(87); // 빈 87바이트 삽입
gc.insertFreeMemory(13); // 빈 13바이트 삽입
gc.insertFreeMemory(102); // 빈 102바이트 삽입
gc.insertFreeMemory(34); // 빈 34바이트 삽입
gc.insertFreeMemory(61); // 빈 61바이트 삽입
gc.insertFreeMemory(40); // 빈 40바이트 삽입
gc.insertFreeMemory(6); // 빈 6바이트 삽입




let freeMemory1 = gc.searchFreeMemory(64); // 64바이트 메모리 획득
console.log(freeMemory1);
if(freeMemory1){
    gc.releaseFreeMemory(freeMemory1.data);
}

let freeMemory2 = gc.searchFreeMemory(42); // 48바이트 메모리 획득
console.log(freeMemory2);
if(freeMemory2){
    gc.releaseFreeMemory(freeMemory2.data);
}