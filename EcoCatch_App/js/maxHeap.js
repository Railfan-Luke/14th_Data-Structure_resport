// Max-Heap implementation for real-time leaderboard management
// Elements are user objects: { id, name, points, level, avatarIdx }

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Helper index lookups
  _parent(i) { return Math.floor((i - 1) / 2); }
  _leftChild(i) { return 2 * i + 1; }
  _rightChild(i) { return 2 * i + 2; }

  // Swap helper
  _swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  // Insert a new user
  insert(user) {
    this.heap.push({ ...user });
    this._bubbleUp(this.heap.length - 1);
  }

  // Extract the user with the highest points
  extractMax() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return max;
  }

  // Update points for a user and re-heapify
  updatePoints(userId, addPoints) {
    for (let i = 0; i < this.heap.length; i++) {
      if (this.heap[i].id === userId) {
        this.heap[i].points += addPoints;
        // Check if we need to bubble up or sink down
        const parentIdx = this._parent(i);
        if (i > 0 && this.heap[i].points > this.heap[parentIdx].points) {
          this._bubbleUp(i);
        } else {
          this._sinkDown(i);
        }
        return true;
      }
    }
    return false;
  }

  // Bubble up to restore heap property
  _bubbleUp(i) {
    while (i > 0) {
      const p = this._parent(i);
      if (this.heap[i].points <= this.heap[p].points) break;
      this._swap(i, p);
      i = p;
    }
  }

  // Sink down to restore heap property
  _sinkDown(i) {
    const len = this.heap.length;
    while (true) {
      let left = this._leftChild(i);
      let right = this._rightChild(i);
      let largest = i;

      if (left < len && this.heap[left].points > this.heap[largest].points) {
        largest = left;
      }
      if (right < len && this.heap[right].points > this.heap[largest].points) {
        largest = right;
      }

      if (largest === i) break;
      this._swap(i, largest);
      i = largest;
    }
  }

  // Return sorted users (brute force extraction or copies)
  getSortedRankings() {
    // Return a sorted copy of the heap items without destructive extraction
    return [...this.heap].sort((a, b) => b.points - a.points);
  }

  // Return the heap array structure
  getHeapArray() {
    return [...this.heap];
  }

  // Returns node connections for drawing binary tree lines in HTML/SVG
  getTreeStructure() {
    const nodes = [];
    const links = [];
    
    for (let i = 0; i < this.heap.length; i++) {
      nodes.push({
        index: i,
        name: this.heap[i].name,
        points: this.heap[i].points,
        avatarIdx: this.heap[i].avatarIdx
      });
      
      const left = this._leftChild(i);
      const right = this._rightChild(i);
      
      if (left < this.heap.length) {
        links.push({ parent: i, child: left });
      }
      if (right < this.heap.length) {
        links.push({ parent: i, child: right });
      }
    }

    return { nodes, links };
  }
}

// Expose to window
window.MaxHeap = MaxHeap;
