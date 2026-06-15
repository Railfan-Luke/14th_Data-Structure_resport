// 2D KD-Tree implementation for spatial index nearest neighbor search
// Dimensions: 0 = latitude (lat), 1 = longitude (lng)

class KDTreeNode {
  constructor(point, axis, left = null, right = null) {
    this.point = point; // Station object containing lat, lng
    this.axis = axis;   // 0 (lat) or 1 (lng)
    this.left = left;
    this.right = right;
  }
}

class KDTree {
  constructor(points) {
    this.searchHistory = []; // Used to trace step-by-step search
    this.root = this.build(points, 0);
  }

  // Build a balanced KD-Tree by finding median along the split axis
  build(points, depth) {
    if (points.length === 0) return null;

    const axis = depth % 2; // Alternating split dimensions (0 = lat, 1 = lng)

    // Sort points based on split axis coordinate
    points.sort((a, b) => {
      const coordA = axis === 0 ? a.lat : a.lng;
      const coordB = axis === 0 ? b.lat : b.lng;
      return coordA - coordB;
    });

    const medianIdx = Math.floor(points.length / 2);
    const medianPoint = points[medianIdx];

    const node = new KDTreeNode(medianPoint, axis);
    node.left = this.build(points.slice(0, medianIdx), depth + 1);
    node.right = this.build(points.slice(medianIdx + 1), depth + 1);

    return node;
  }

  // Helper to calculate Euclidean distance squared
  _getDistanceSq(p1, p2) {
    const dLat = p1.lat - p2.lat;
    const dLng = p1.lng - p2.lng;
    return dLat * dLat + dLng * dLng;
  }

  // Find nearest neighbor to target coordinate { lat, lng }
  findNearest(target) {
    this.searchHistory = []; // Reset trace
    let best = { node: null, distSq: Infinity };
    
    const search = (node, depth) => {
      if (!node) return;

      const axis = node.axis;
      const distSq = this._getDistanceSq(target, node.point);
      
      // Log visit history
      this.searchHistory.push({
        nodeId: node.point.id,
        nodeName: node.point.name,
        axis: axis === 0 ? "Lat" : "Lng",
        splitVal: axis === 0 ? node.point.lat : node.point.lng,
        dist: Math.sqrt(distSq).toFixed(5)
      });

      if (distSq < best.distSq) {
        best.node = node.point;
        best.distSq = distSq;
      }

      // Determine coordinate values on split dimension
      const targetVal = axis === 0 ? target.lat : target.lng;
      const nodeVal = axis === 0 ? node.point.lat : node.point.lng;

      let nextBranch = null;
      let oppositeBranch = null;

      if (targetVal < nodeVal) {
        nextBranch = node.left;
        oppositeBranch = node.right;
      } else {
        nextBranch = node.right;
        oppositeBranch = node.left;
      }

      // Search closer branch first
      search(nextBranch, depth + 1);

      // Check if opposite branch could contain a closer node
      // The distance between the target and splitting hyper-plane is (targetVal - nodeVal)
      const planeDistSq = (targetVal - nodeVal) * (targetVal - nodeVal);
      if (planeDistSq < best.distSq) {
        search(oppositeBranch, depth + 1);
      }
    };

    search(this.root, 0);
    return {
      nearest: best.node,
      distance: Math.sqrt(best.distSq),
      history: this.searchHistory
    };
  }
}

// Expose to window
window.KDTreeNode = KDTreeNode;
window.KDTree = KDTree;
