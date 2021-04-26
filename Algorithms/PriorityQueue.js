class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(value, priority) {
    let node = new Node(value, priority);
    this.values.push(node);
    this.bubbleUp();
    console.log(this.values);
  }
  bubbleUp() {
    let index = this.values.length - 1;
    const value = this.values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parentValue = this.values[parentIndex];
      if (value.priority <= parentValue.priority) break;
      this.values[parentIndex] = value;
      this.values[index] = parentValue;
      index = parentIndex;
    }
  }
  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length === 0) return max;
    this.values[0] = end;
    this.sinkDown();
    console.log(this.values);
    console.log("removed", max);
    return max;
  }
  sinkDown() {
    let index = 0;
    const length = this.values.length;
    const value = this.values[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild.priority > value.priority) {
          swap = leftChildIndex;
        }
      }
      if (leftChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (rightChild.priority > value.priority && !swap) ||
          (swap && rightChild.priority > leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }
      if (!swap) break;
      this.values[index] = this.values[swap];
      this.values[swap] = value;
      index = swap;
    }
  }
}

let heap = new PriorityQueue();

heap.enqueue(55, 4);
heap.enqueue(13, 1);
heap.enqueue(42, 2);
heap.enqueue(24, 1);

heap.dequeue();
