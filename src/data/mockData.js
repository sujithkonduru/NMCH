export const summaryCards = [
  { id: 1, label: 'Total Registered', value: 1248, icon: 'persons', change: +5.2, color: 'blue' },
  { id: 2, label: 'Served Today', value: 892, icon: 'served', change: +8.1, color: 'green' },
  { id: 3, label: 'Breakfast Count', value: 312, icon: 'breakfast', change: +12.0, color: 'orange' },
  { id: 4, label: 'Lunch Count', value: 415, icon: 'lunch', change: +3.4, color: 'teal' },
  { id: 5, label: 'Dinner Count', value: 165, icon: 'dinner', change: -8.0, color: 'purple' },
  { id: 6, label: 'Duplicates Prevented', value: 37, icon: 'duplicate', change: -15.0, color: 'red' },
  { id: 7, label: 'Active Cameras', value: 5, icon: 'camera', change: 0, color: 'green' },
  { id: 8, label: 'Recognition Accuracy', value: '98.4%', icon: 'accuracy', change: +1.2, color: 'blue' },
];

export const mealPieData = [
  { name: 'Breakfast', value: 312, color: '#f59e0b' },
  { name: 'Lunch', value: 415, color: '#3b82f6' },
  { name: 'Dinner', value: 165, color: '#8b5cf6' },
];

export const dailyTrendData = [
  { day: 'Mon', breakfast: 280, lunch: 390, dinner: 150 },
  { day: 'Tue', breakfast: 300, lunch: 420, dinner: 170 },
  { day: 'Wed', breakfast: 290, lunch: 400, dinner: 145 },
  { day: 'Thu', breakfast: 312, lunch: 415, dinner: 165 },
  { day: 'Fri', breakfast: 330, lunch: 440, dinner: 180 },
  { day: 'Sat', breakfast: 200, lunch: 280, dinner: 120 },
  { day: 'Sun', breakfast: 180, lunch: 260, dinner: 110 },
];

export const hourlyData = [
  { hour: '6AM', count: 45 },
  { hour: '7AM', count: 112 },
  { hour: '8AM', count: 180 },
  { hour: '9AM', count: 95 },
  { hour: '10AM', count: 30 },
  { hour: '11AM', count: 55 },
  { hour: '12PM', count: 210 },
  { hour: '1PM', count: 175 },
  { hour: '2PM', count: 88 },
  { hour: '3PM', count: 20 },
  { hour: '6PM', count: 90 },
  { hour: '7PM', count: 140 },
  { hour: '8PM', count: 110 },
  { hour: '9PM', count: 45 },
];

export const weeklyData = [
  { week: 'Week 1', total: 890 },
  { week: 'Week 2', total: 950 },
  { week: 'Week 3', total: 920 },
  { week: 'Week 4', total: 1070 },
];

export const consumptionTrendData = [
  { month: 'Jan', rice: 420, dal: 110, veg: 180 },
  { month: 'Feb', rice: 390, dal: 105, veg: 165 },
  { month: 'Mar', rice: 450, dal: 120, veg: 200 },
  { month: 'Apr', rice: 480, dal: 130, veg: 215 },
  { month: 'May', rice: 510, dal: 140, veg: 230 },
  { month: 'Jun', rice: 490, dal: 135, veg: 220 },
];

export const recognizedPersons = [
  { id: 'EMP001', name: 'Rahul Sharma', time: '08:12 AM', meal: 'Breakfast', confidence: '99.2%', status: 'served' },
  { id: 'EMP002', name: 'Priya Singh', time: '08:15 AM', meal: 'Breakfast', confidence: '97.8%', status: 'served' },
  { id: 'EMP003', name: 'Amit Kumar', time: '08:18 AM', meal: 'Breakfast', confidence: '96.5%', status: 'duplicate' },
  { id: 'EMP004', name: 'Sneha Patel', time: '08:22 AM', meal: 'Breakfast', confidence: '98.9%', status: 'served' },
  { id: 'UNK001', name: 'Unknown', time: '08:25 AM', meal: 'Breakfast', confidence: '45.2%', status: 'unknown' },
  { id: 'EMP005', name: 'Vikram Nair', time: '12:05 PM', meal: 'Lunch', confidence: '99.1%', status: 'served' },
  { id: 'EMP006', name: 'Anita Rao', time: '12:10 PM', meal: 'Lunch', confidence: '98.3%', status: 'served' },
  { id: 'EMP007', name: 'Ravi Verma', time: '12:14 PM', meal: 'Lunch', confidence: '97.6%', status: 'duplicate' },
];

export const duplicateAttempts = [
  { person: 'Amit Kumar', id: 'EMP003', prevVisit: '08:05 AM', currVisit: '08:18 AM', diff: '13 min', status: 'Rejected' },
  { person: 'Ravi Verma', id: 'EMP007', prevVisit: '12:02 PM', currVisit: '12:14 PM', diff: '12 min', status: 'Rejected' },
  { person: 'Sunita Devi', id: 'EMP010', prevVisit: '07:55 AM', currVisit: '08:30 AM', diff: '35 min', status: 'Rejected' },
  { person: 'Mohan Das', id: 'EMP015', prevVisit: '12:30 PM', currVisit: '12:55 PM', diff: '25 min', status: 'Rejected' },
];

export const cameras = [
  { id: 1, name: 'Camera 1 - Main Gate', status: 'online', fps: 30, location: 'Entrance' },
  { id: 2, name: 'Camera 2 - Breakfast Counter', status: 'online', fps: 28, location: 'Counter A' },
  { id: 3, name: 'Camera 3 - Lunch Counter', status: 'online', fps: 30, location: 'Counter B' },
  { id: 4, name: 'Camera 4 - Dinner Counter', status: 'offline', fps: 0, location: 'Counter C' },
  { id: 5, name: 'Camera 5 - Exit', status: 'online', fps: 25, location: 'Exit' },
  { id: 6, name: 'Camera 6 - Kitchen', status: 'online', fps: 22, location: 'Kitchen' },
];

export const aiInsights = [
  { type: 'up', text: 'Breakfast attendance increased by 12% compared to last week.' },
  { type: 'up', text: 'Lunch demand is expected to increase by 8% tomorrow.' },
  { type: 'down', text: 'Dinner attendance decreased by 8% this week.' },
  { type: 'down', text: 'Duplicate attempts reduced by 15% after system upgrade.' },
  { type: 'info', text: 'Recognition accuracy reached 98.4% — highest this month.' },
  { type: 'warn', text: 'Recommend preparing 10% extra breakfast due to increasing trend.' },
  { type: 'info', text: 'Peak lunch hour is 12–1 PM; allocate more staff during this period.' },
];

export const predictions = {
  confidence: 96,
  expectedVisitors: 1070,
  breakfast: { persons: 240, rice: 80, dal: 20, veg: 35 },
  lunch: { persons: 510, rice: 180, dal: 45, curries: 70 },
  dinner: { persons: 320, rice: 120, dal: 28, veg: 50 },
};

export const recentActivities = [
  { time: '08:25 AM', event: 'Unknown person detected at Entrance camera', type: 'alert' },
  { time: '08:18 AM', event: 'Duplicate attempt by EMP003 - Amit Kumar', type: 'warn' },
  { time: '08:15 AM', event: 'EMP002 Priya Singh served Breakfast', type: 'success' },
  { time: '08:12 AM', event: 'EMP001 Rahul Sharma served Breakfast', type: 'success' },
  { time: '08:00 AM', event: 'Breakfast distribution started', type: 'info' },
  { time: '07:58 AM', event: 'Camera 4 went offline', type: 'alert' },
  { time: '07:55 AM', event: 'System health check passed', type: 'success' },
];
