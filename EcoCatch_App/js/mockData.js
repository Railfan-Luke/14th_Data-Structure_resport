// Mock Data for EcoCatch Application
// Seed data for the KD-Tree (Recycle stations) and Graph (Road network)

// 1. Recycle Stations (iTrash and Public bins in Taipei Gongguan Area)
const recycleStations = [
  { id: "s1", name: "iTrash 羅斯福路站", lat: 25.0195, lng: 121.5301, type: "iTrash", accepted: ["pet_bottle", "aluminum_can"], capacity: "42% 空間可用", status: "正常營運" },
  { id: "s2", name: "iTrash 公館水源站", lat: 25.0172, lng: 121.5342, type: "iTrash", accepted: ["pet_bottle", "aluminum_can", "paper_box"], capacity: "78% 空間可用", status: "正常營運" },
  { id: "s3", name: "汀州路分類垃圾桶", lat: 25.0145, lng: 121.5365, type: "PublicBin", accepted: ["pet_bottle", "paper_box", "general_waste"], capacity: "15% 空間可用", status: "即將滿載" },
  { id: "s4", name: "台大校門口回收點", lat: 25.0175, lng: 121.5398, type: "PublicBin", accepted: ["pet_bottle", "aluminum_can", "paper_box"], capacity: "90% 空間可用", status: "正常營運" },
  { id: "s5", name: "公館捷運站出口一", lat: 25.0170, lng: 121.5330, type: "PublicBin", accepted: ["general_waste"], capacity: "50% 空間可用", status: "正常營運" }
];

// 2. Road Network Graph around Gongguan Area
// Nodes (Intersections & Stations)
const graphNodes = {
  "n0": { id: "n0", name: "使用者當前位置", lat: 25.0160, lng: 121.5320, isUser: true },
  "n1": { id: "n1", name: "羅斯福汀州路口", lat: 25.0180, lng: 121.5310 },
  "n2": { id: "n2", name: "水源市場側門", lat: 25.0171, lng: 121.5335 },
  "n3": { id: "n3", name: "舟山路口", lat: 25.0174, lng: 121.5380 },
  "n4": { id: "n4", name: "新生南路路口", lat: 25.0190, lng: 121.5350 },
  
  // Connect to Recycle Stations
  "s1": { id: "s1", name: "iTrash 羅斯福路站", lat: 25.0195, lng: 121.5301, isStation: true },
  "s2": { id: "s2", name: "iTrash 公館水源站", lat: 25.0172, lng: 121.5342, isStation: true },
  "s3": { id: "s3", name: "汀州路分類垃圾桶", lat: 25.0145, lng: 121.5365, isStation: true },
  "s4": { id: "s4", name: "台大校門口回收點", lat: 25.0175, lng: 121.5398, isStation: true },
  "s5": { id: "s5", name: "公館捷運站出口一", lat: 25.0170, lng: 121.5330, isStation: true }
};

// Edges (Roads connecting nodes)
// Distance represents edge weight in meters (approx calculated from lat/lng)
const graphEdges = [
  { u: "n0", v: "n1", weight: 240 },
  { u: "n0", v: "n2", weight: 200 },
  { u: "n0", v: "s5", weight: 150 },
  
  { u: "n1", v: "s1", weight: 180 },
  { u: "n1", v: "n4", weight: 380 },
  
  { u: "n2", v: "s2", weight: 80 },
  { u: "n2", v: "s5", weight: 60 },
  { u: "n2", v: "n3", weight: 450 },
  
  { u: "s5", v: "s3", weight: 400 },
  
  { u: "n3", v: "s4", weight: 210 },
  { u: "n3", v: "n4", weight: 350 },
  { u: "n3", v: "s2", weight: 380 },
  
  { u: "n4", v: "s1", weight: 480 },
  { u: "s3", v: "s2", weight: 360 }
];

// 3. Seed Users for Leaderboard (Max-Heap)
const seedUsers = [
  { id: "u1", name: "Alex", points: 1200, level: "環保先鋒", avatarIdx: 1 },
  { id: "u2", name: "Bella", points: 1050, level: "減碳達人", avatarIdx: 2 },
  { id: "u3", name: "Chris", points: 980, level: "回收戰士", avatarIdx: 3 },
  { id: "u4", name: "David", points: 720, level: "綠生活新星", avatarIdx: 4 },
  { id: "u5", name: "Emma", points: 850, level: "減碳好手", avatarIdx: 5 },
  { id: "u6", name: "Fiona", points: 610, level: "綠色實踐者", avatarIdx: 6 }
];

// 4. Coupons in Reward Shop
const coupons = [
  { id: "c1", merchant: "7-Eleven", title: "中杯熱美式咖啡", points: 150, description: "用咖啡開啟你的綠色活力一天", icon: "coffee" },
  { id: "c2", merchant: "全家便利商店", title: "50元折價券", points: 400, description: "全店消費折抵，環保好行", icon: "confirmation_number" },
  { id: "c3", merchant: "Eco-Store", title: "有機再生環保袋", points: 100, description: "耐用 100% 回收纖維製成", icon: "shopping_bag" },
  { id: "c4", merchant: "星巴克", title: "好友分享券 (買一送一)", points: 300, description: "自備環保杯再折抵 10 元", icon: "local_cafe" }
];

// Expose variables globally
window.recycleStations = recycleStations;
window.graphNodes = graphNodes;
window.graphEdges = graphEdges;
window.seedUsers = seedUsers;
window.coupons = coupons;
