// Graph & MinHeap implementation for Dijkstra shortest path navigation

class MinHeapNode {
  constructor(id, priority) {
    this.id = id;             // Node identifier
    this.priority = priority; // Distance weight
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(id, priority) {
    const node = new MinHeapNode(id, priority);
    this.heap.push(node);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min;
  }

  decreaseKey(id, newPriority) {
    for (let i = 0; i < this.heap.length; i++) {
      if (this.heap[i].id === id) {
        if (newPriority < this.heap[i].priority) {
          this.heap[i].priority = newPriority;
          this._bubbleUp(i);
        }
        break;
      }
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[index].priority >= this.heap[parentIdx].priority) break;
      
      // Swap
      const temp = this.heap[index];
      this.heap[index] = this.heap[parentIdx];
      this.heap[parentIdx] = temp;
      
      index = parentIdx;
    }
  }

  _sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swapIdx = null;

      if (leftChildIdx < length) {
        if (this.heap[leftChildIdx].priority < element.priority) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        const checkIndex = swapIdx !== null ? swapIdx : index;
        if (this.heap[rightChildIdx].priority < this.heap[checkIndex].priority) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;

      // Swap
      this.heap[index] = this.heap[swapIdx];
      this.heap[swapIdx] = element;
      index = swapIdx;
    }
  }
}

class Graph {
  constructor() {
    this.adjacencyList = new Map();
    this.nodesInfo = new Map();
  }

  addNode(id, info) {
    this.adjacencyList.set(id, []);
    this.nodesInfo.set(id, info);
  }

  addEdge(u, v, weight) {
    if (!this.adjacencyList.has(u) || !this.adjacencyList.has(v)) return;
    this.adjacencyList.get(u).push({ node: v, weight });
    this.adjacencyList.get(v).push({ node: u, weight }); // Undirected graph
  }

  clearNodeEdges(nodeId) {
    if (!this.adjacencyList.has(nodeId)) return;
    
    // Get all neighbors of this node
    const neighbors = this.adjacencyList.get(nodeId) || [];
    
    // For each neighbor, filter out the nodeId from their adjacency list
    for (const neighbor of neighbors) {
      const neighborList = this.adjacencyList.get(neighbor.node) || [];
      this.adjacencyList.set(neighbor.node, neighborList.filter(edge => edge.node !== nodeId));
    }
    
    // Empty this node's adjacency list
    this.adjacencyList.set(nodeId, []);
  }

  dijkstra(startId, endId) {
    const distances = {};
    const previous = {};
    const heap = new MinHeap();
    const visitedOrder = []; // Track search steps for visualization

    // Initialize distances
    for (const [nodeId] of this.adjacencyList) {
      if (nodeId === startId) {
        distances[nodeId] = 0;
        heap.insert(nodeId, 0);
      } else {
        distances[nodeId] = Infinity;
        heap.insert(nodeId, Infinity);
      }
      previous[nodeId] = null;
    }

    while (!heap.isEmpty()) {
      const minNode = heap.extractMin();
      if (!minNode || minNode.priority === Infinity) break;
      
      const currentId = minNode.id;
      visitedOrder.push(currentId);

      if (currentId === endId) break; // Found target!

      // Check neighbors
      const neighbors = this.adjacencyList.get(currentId) || [];
      for (const edge of neighbors) {
        const neighborId = edge.node;
        const candidateDist = distances[currentId] + edge.weight;

        if (candidateDist < distances[neighborId]) {
          distances[neighborId] = candidateDist;
          previous[neighborId] = currentId;
          heap.decreaseKey(neighborId, candidateDist);
        }
      }
    }

    // Reconstruct shortest path
    const path = [];
    let curr = endId;
    while (curr !== null) {
      path.unshift(curr);
      curr = previous[curr];
    }

    // If start node is not connected to end node (e.g. no valid path)
    const isValidPath = path[0] === startId;

    return {
      path: isValidPath ? path : [],
      distance: isValidPath ? distances[endId] : Infinity,
      visitedOrder: visitedOrder
    };
  }
}

// Expose to window
window.MinHeapNode = MinHeapNode;
window.MinHeap = MinHeap;
window.Graph = Graph;
