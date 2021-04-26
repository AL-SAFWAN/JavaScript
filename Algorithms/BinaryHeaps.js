class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12];
  }
  insert(value) {
    this.values.push(value);
    this.bubbleUp();
    console.log(this.values);
  }
  bubbleUp() {
    let index = this.values.length - 1;
    const value = this.values[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parentValue = this.values[parentIndex];
      if (value <= parentValue) break;

      this.values[parentIndex] = value;
      this.values[index] = parentValue;
      index = parentIndex;
    }
  }
  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length === 0) return max;
    this.values[0] = end;
    this.sinkDown();
    console.log(this.values);
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
        if (leftChild > value) {
          swap = leftChildIndex;
        }
      }
      if (leftChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if ((rightChild > value && !swap) || (swap && rightChild > leftChild)) {
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

let heap = new MaxBinaryHeap();

heap.insert(55);
heap.extractMax();
