class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((e) => e === v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter((e) => e === v1);
  }
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      this.removeEdge(vertex, this.adjacencyList[vertex].pop());
    }
    delete this.adjacencyList[vertex];
  }
  depthFirstRecursive(start) {
    const result = [];
    const visited = {};
    const list = this.adjacencyList;
    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      list[vertex].forEach((e) => {
        if (!visited[e]) {
          return dfs(e);
        }
      });
    })(start);
    console.log(result);
    return result;
  }
  depthFirstIterative(start) {
    const stack = [start];
    const result = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((e) => {
        if (!visited[e]) {
          visited[e] = true;
          stack.push(e);
        }
      });
    }
    console.log(result);
    return result;
  }
  breathFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;
    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((e) => {
        if (!visited[e]) {
          visited[e] = true;
          queue.push(e);
        }
      });
    }
    console.log(result);
    return result;
  }
}

// let g = new Graph();

// g.addVertex("A");
// g.addVertex("B");
// g.addVertex("C");
// g.addVertex("D");
// g.addVertex("E");
// g.addVertex("F");

// g.addEdge("A", "B");
// g.addEdge("A", "C");
// g.addEdge("B", "D");
// g.addEdge("C", "E");
// g.addEdge("D", "E");
// g.addEdge("D", "F");
// g.addEdge("E", "F");

// g.depthFirstRecursive("A");
// g.depthFirstIterative("A");
// g.breathFirstSearch("A");

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distance = {};
    const previous = {};
    let path = [];
    let smallest;
    //Init
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distance[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distance[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distance[smallest] !== Infinity) {
        for (let e in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][e];
          let check = distance[smallest] + nextNode.weight;
          if (check < distance[nextNode.node]) {
            distance[nextNode.node] = check;
            previous[nextNode.node] = smallest;
            nodes.enqueue(nextNode, check);
          }
        }
      }
    }
    console.log(path.concat(smallest).reverse());
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(v, p) {
    this.values.push({ val: v, priority: p });
    this.sort();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
  dequeue() {
    return this.values.shift();
  }
}

/* 
1. pick a node with the smallest know distance 
2. move to the node to visit, look at the neighbors
3. for each neighbor node calculate the sum distance 
4. if the total distance is least, we store it as the shortest distance 
*/

let g = new WeightedGraph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "E", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

g.Dijkstra("A", "F");
