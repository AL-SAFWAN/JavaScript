class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(val) {
    var node = new Node(val);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      let temp = this.first;
      this.first = node;
      this.first.next = temp;
    }
    return ++this.size;
  }
  pop() {
    if (!this.first) return null;
    var temp = this.first;
    if ((this.first = this.last)) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }
}

class Queue {
  constructor() {
    this.end = null;
    this.start = null;
    this.size = 0;
  }

  enqueue(val) {
    let node = new Node(val);
    if (!this.start) {
      this.start = node;
      this.end = node;
    } else {
      this.end.next = node;
      this.end = node;
    }
  }
  dequeue() {
    if (!this.start) return null;
    let temp = this.start;
    if (this.start === this.end) {
      this.end = null;
    }
    this.start = this.start.next;
    this.size--;
    return temp.val;
  }
}
