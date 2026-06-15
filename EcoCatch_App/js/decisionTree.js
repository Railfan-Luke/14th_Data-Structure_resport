// Decision Tree implementation for waste classification
// Used by the Vision Classification Agent

class DecisionTreeNode {
  constructor({ id, label, question = null, left = null, right = null, isLeaf = false, categoryId = null }) {
    this.id = id;
    this.label = label;
    this.question = question; // Question string if not leaf
    this.left = left;         // "Yes" branch
    this.right = right;       // "No" branch
    this.isLeaf = isLeaf;
    this.categoryId = categoryId;
  }
}

class DecisionTree {
  constructor() {
    this.root = this.buildTree();
  }

  buildTree() {
    // Leaves
    const leafPET = new DecisionTreeNode({ id: "leaf_pet", label: "寶特瓶", isLeaf: true, categoryId: "pet_bottle" });
    const leafCan = new DecisionTreeNode({ id: "leaf_can", label: "鐵鋁罐", isLeaf: true, categoryId: "aluminum_can" });
    const leafPaper = new DecisionTreeNode({ id: "leaf_paper", label: "紙容器", isLeaf: true, categoryId: "paper_box" });
    const leafTrash = new DecisionTreeNode({ id: "leaf_trash", label: "一般垃圾", isLeaf: true, categoryId: "general_waste" });

    // Internal Nodes
    // Q3: Is it a bottle shape? (Plastic subtree)
    const nodeBottle = new DecisionTreeNode({
      id: "node_bottle",
      label: "是否為瓶罐外觀？",
      question: "這件塑膠容器是瓶子形狀（如寶特瓶、牛奶瓶）嗎？",
      left: leafPET,
      right: leafTrash // if plastic but not bottle/container we recycle, might be thin film/dirty plastic -> general waste
    });

    // Q4: Is it metal?
    const nodeMetal = new DecisionTreeNode({
      id: "node_metal",
      label: "是否為金屬材質？",
      question: "它是鐵罐、鋁罐或其它金屬容器嗎？",
      left: leafCan,
      right: nodeBottle // If not metal, check plastic bottle question
    });

    // Q2: Is it paper? (Recyclable subbranch)
    const nodePaper = new DecisionTreeNode({
      id: "node_paper",
      label: "是否為紙質容器？",
      question: "它是餐盒、紙杯或紙箱等紙類容器嗎？",
      left: leafPaper,
      right: nodeMetal // If not paper, check metal
    });

    // Root Q1: Is it recyclable?
    const rootNode = new DecisionTreeNode({
      id: "root",
      label: "是否可回收？",
      question: "物品表面是否有回收標誌，且乾淨未沾染大量油污？",
      left: nodePaper, // Yes -> Check if paper
      right: leafTrash // No -> General waste
    });

    return rootNode;
  }

  // Get path for a specific category (useful for showing O(log N) visual path)
  getPathToLeaf(categoryId) {
    const path = [];
    
    const find = (node) => {
      if (!node) return false;
      path.push(node);
      if (node.isLeaf && node.categoryId === categoryId) {
        return true;
      }
      if (find(node.left) || find(node.right)) {
        return true;
      }
      path.pop();
      return false;
    };

    find(this.root);
    return path;
  }
}

// Expose to window
window.DecisionTreeNode = DecisionTreeNode;
window.DecisionTree = DecisionTree;
