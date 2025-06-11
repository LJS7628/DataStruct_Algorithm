import { Heap } from "./heap.mjs";

class Process{
    
    constructor(name, cpuReturnCount, executionCount){
        this.name = name;
        this.cpuReturnCount = cpuReturnCount;
        this.executionCount = executionCount;
        this.priority = executionCount;
        this.priority2 = cpuReturnCount;
    }

    
}

class CpuScheduler
{
    constructor()
    {
        this.heap = new Heap();
        this.heap.isBigPriority = function(first, second){
            if(first.priority != second.priority)
                return (first.priority < second.priority);
            else if(first.priority == second.priority)
                return (first.priority2 > second.priority2);
        }
    }

    enqueue(data){
        this.heap.insert(data);
    }

    dequeue(){
        return this.heap.remove();
    }
}

let cpuScheduler = new CpuScheduler();
cpuScheduler.enqueue(new Process("수치계산프로그램", 4, 0)); // cpu반납 4회, 실행횟수 0회
cpuScheduler.enqueue(new Process("뮤직플레이어", 11, 10)); // cpu반납 11회, 실행횟수 10회
cpuScheduler.enqueue(new Process("웹브라우저", 27, 25)); // cpu반납 27회, 실행횟수 25
cpuScheduler.enqueue(new Process("터미널1", 34, 2)); // cpu반납 34회, 실행횟수 2회
cpuScheduler.enqueue(new Process("터미널2", 93, 2)); // cpu반납 93회, 실행횟수 2회

console.log(cpuScheduler.dequeue()); // 수치계산프로그램 프로세스 출력
console.log(cpuScheduler.dequeue()); // 터미널2 프로세스 출력
console.log(cpuScheduler.dequeue()); // 터미널1 프로세스 출력
console.log(cpuScheduler.dequeue()); // 뮤직플레이어 프로세스 출력
console.log(cpuScheduler.dequeue()); // 웹브라우저 프로세스 출력


