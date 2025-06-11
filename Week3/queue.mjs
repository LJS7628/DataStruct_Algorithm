class QueueNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
    }

    isEmpty() {
        return this.front === null;
    }

    enqueue(data) {
        const newNode = new QueueNode(data);
        if (this.rear) {
            this.rear.next = newNode;
        }
        this.rear = newNode;
        if (!this.front) {
            this.front = newNode;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const dequeuedNode = this.front;
        this.front = this.front.next;
        if (!this.front) {
            this.rear = null;
        }
        return dequeuedNode;
    }
}

export { QueueNode, Queue};