// Custom HashMap implementation with chaining for collision resolution
// Used to store waste details indexed by categoryId

class HashMapEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null; // Next entry in chain (Linked List)
  }
}

class HashMap {
  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null);
    this.size = 0;
    this.seedData();
  }

  // Simple hashing algorithm
  _hash(key) {
    let hashVal = 0;
    for (let i = 0; i < key.length; i++) {
      hashVal = (hashVal * 31 + key.charCodeAt(i)) % this.capacity;
    }
    return hashVal;
  }

  // Put key-value pair
  put(key, value) {
    const index = this._hash(key);
    let current = this.buckets[index];

    if (!current) {
      this.buckets[index] = new HashMapEntry(key, value);
      this.size++;
      return;
    }

    // Traverse the chain
    while (current) {
      if (current.key === key) {
        current.value = value; // Update existing
        return;
      }
      if (!current.next) {
        break;
      }
      current = current.next;
    }

    // Append to chain (collision handled via chaining)
    current.next = new HashMapEntry(key, value);
    this.size++;
  }

  // Get value by key
  get(key) {
    const index = this._hash(key);
    let current = this.buckets[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null; // Not found
  }

  // Return bucket structures for visualization
  getBucketsState() {
    const state = [];
    for (let i = 0; i < this.capacity; i++) {
      const chain = [];
      let current = this.buckets[i];
      while (current) {
        chain.push({ key: current.key, hash: i });
        current = current.next;
      }
      state.push({ index: i, chain: chain });
    }
    return state;
  }

  // Seed default data
  seedData() {
    this.put("pet_bottle", {
      name: "寶特瓶",
      englishName: "PET Bottle",
      categoryId: "pet_bottle",
      chineseDesc: "(聚乙烯對苯二甲酸酯)",
      material: "Verified Plastic #1",
      carbonReduction: 0.05,
      pointsReward: 10,
      icon: "delete_outline",
      steps: [
        "清空瓶內殘餘液體 (Empty contents)",
        "用水沖洗殘留污垢 (Rinse residue)",
        "壓扁瓶身以節省體積 (Compress bottle)",
        "投遞至「塑膠容器類」資源回收箱 (Discard in Plastic Recycling)"
      ]
    });

    this.put("aluminum_can", {
      name: "鐵鋁罐",
      englishName: "Aluminum Can",
      categoryId: "aluminum_can",
      chineseDesc: "(鐵、鋁製容器)",
      material: "Recyclable Metal",
      carbonReduction: 0.08,
      pointsReward: 15,
      icon: "delete_outline",
      steps: [
        "倒空殘留飲料並沖洗防臭 (Rinse can)",
        "壓扁罐體以節省空間 (Compress can)",
        "投遞至「金屬類/鐵鋁罐」資源回收桶 (Discard in Metal Recycling)"
      ]
    });

    this.put("paper_box", {
      name: "紙容器",
      englishName: "Paper Box",
      categoryId: "paper_box",
      chineseDesc: "(紙杯、便當盒、紙盒)",
      material: "Recyclable Paper",
      carbonReduction: 0.04,
      pointsReward: 12,
      icon: "delete_outline",
      steps: [
        "清除殘留廚餘與醬汁 (Clean residue)",
        "用水稍微沖洗並擦乾 (Rinse and dry)",
        "摺疊壓扁後重疊堆放 (Compress & stack)",
        "投遞至「紙容器類」資源回收箱 (Discard in Paper Recycling)"
      ]
    });

    this.put("general_waste", {
      name: "一般垃圾",
      englishName: "General Waste",
      categoryId: "general_waste",
      chineseDesc: "(非回收廢棄物)",
      material: "Non-Recyclable",
      carbonReduction: 0.00,
      pointsReward: 2,
      icon: "delete",
      steps: [
        "確認無混入資源回收物 (Check non-recyclables)",
        "使用專用垃圾袋包妥 (Bag properly)",
        "丟入「一般垃圾」垃圾桶或垃圾車 (Discard in General Trash)"
      ]
    });
  }
}

// Expose to window
window.HashMap = HashMap;
window.HashMapEntry = HashMapEntry;
