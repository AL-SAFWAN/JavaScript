class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;
    let currentTail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = currentTail.prev;
      this.tail.next = null;
      currentTail.prev = null;
    }
    this.length--;
    console.log("|the popped node| :", currentTail);
    return currentTail;
  }

  shift() {
    if (this.length === 0) return undefined;
    let currentHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.prev = null;
    } else {
      this.head = currentHead.next;
      this.head.prev = null;
      currentHead.next = null;
    }
    this.length--;
    console.log("|the shifted node| :", currentHead);
    return currentHead;
  }
  //   unshifting
  unshift(val) {
    let node = new Node(val);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;

    if (this.length / 2 > index || index === 0) {
      var node = this.head;
      let counter = 0;
      while (index != counter) {
        node = node.next;
        counter++;
      }
    } else {
      let counter = this.length - 1;
      var node = this.tail;
      while (index != counter) {
        node = node.prev;
        counter--;
      }
    }
    return node;
  }

  set(index, value) {
    let findNode = this.get(index);
    if (findNode) {
      findNode.val = value;
      return true;
    }
    return false;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) return false;

    let node = new Node(value);

    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);
    let beforeNode = this.get(index - 1);
    let afterNode = beforeNode.next;

    console.log(node);
    beforeNode.next = node;
    node.prev = beforeNode;
    node.next = afterNode;
    afterNode.prev = node;
    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) return !!this.shift();
    if (index === this.length - 1) return !!this.pop();

    let removedNode = this.get(index);
    let after = removedNode.next;
    let before = removedNode.prev;
    before.next = after;
    after.prev = before;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;

    console.log("|the removed node| :", removedNode.val);
    return removedNode;
  }

  print() {
    var current = this.head;
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }
}

let list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.shift();
list.unshift(1);
list.push(3);
list.push(4);
list.push(5);
list.push(6);
list.set(4, "5, used set on");
list.insert(2, "here is the insert at 2");
list.remove(1);

list.print();

console.log("the get:", list.get(1).val);
