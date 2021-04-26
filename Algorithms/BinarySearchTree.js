/*
BST 
have only two children 
and sorted 
for root : parent 
less : left side
greater : right side 
*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let node = new Node(value);
    if (!this.root) {
      this.root = node;
      return this;
    } else {
      let current = this.root;
      while (true) {
        if (value === current.value) return undefined;
        if (value < current.value) {
          if (!current.left) {
            current.left = node;
            return this;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (!current.right) {
            current.right = node;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
  find(value) {
    if (!this.root) return false;
    let current = this.root;
    let found = false;
    while (!found && current) {
      if (value < current.value) {
        if (!current.left) {
          current = current.left;
        }
      } else if (value > current.value) {
        if (!current.right) {
          current = current.right;
        }
      } else {
        found = true;
      }
    }
    return current;
  }

  BreadthForSearch() {
    let data = [],
      queue = [],
      node = this.root;

    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    console.log("|BFS | :", data);
    return data;
  }
  DFSPreOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    console.log("|DFS pre order| :", data);
    return data;
  }
  DFSPostOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }
    traverse(current);
    console.log("|DFS post order| :", data);
    return data;
  }
  DFSInOrder() {
    let data = [];
    let current = this.root;
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    console.log("|DFS in order| :", data);
    return data;
  }
}

let list = new BST();

list.insert(10);
list.insert(6);
list.insert(15);
list.insert(3);
list.insert(8);
list.insert(20);

list.BreadthForSearch();
list.DFSPreOrder();
list.DFSPostOrder();
list.DFSInOrder();
