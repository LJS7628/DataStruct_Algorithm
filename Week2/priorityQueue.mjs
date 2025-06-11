import { Heap } from "./heap.mjs";

class PriorityQueue{
    constructor(){
        this.heap = new Heap();
        this.heap.isBigPriority = function(first, second){
            return (first.priority > second.priority);
        }
    }

    enqueue(data){
        this.heap.insert(data);
    }

    dequeue(){
        return this.heap.remove();
    }
}

class Monster{
    constructor(name, health){
        this.name = name;
        this.healath = health;
        this.priority = health;
    }
}

export { PriorityQueue, Monster };

