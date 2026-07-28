/**
 * Mock API adapter — intercepts axios requests when
 * VITE_USE_MOCK=true (or no real backend is available).
 *
 * Uses axios-mock-adapter to return mock data from mockData.js.
 * In production, remove this import from main.jsx.
 */
import MockAdapter from 'axios-mock-adapter';
import api from './axios';
import {
  summaryCards, mealPieData, dailyTrendData, hourlyData,
  weeklyData, consumptionTrendData, recognizedPersons,
  duplicateAttempts, cameras, aiInsights, recentActivities,
  predictions,
} from '../data/mockData';

const mock = new MockAdapter(api, { delayResponse: 400 });

// AUTH
mock.onPost('/auth/login').reply(({ data }) => {
  const { email } = JSON.parse(data);
  const token = 'mock-jwt-token-' + Date.now();
  localStorage.setItem('canteen_token', token);
  return [200, {
    token,
    user: { name: 'Admin User', email, role: email.includes('operator') ? 'Operator' : 'Admin' },
  }];
});
mock.onPost('/auth/logout').reply(200, { ok: true });
mock.onGet('/auth/me').reply(200, {
  name: 'Admin User', email: 'admin@canteen.com', role: 'Admin',
});

// DASHBOARD
mock.onGet('/dashboard/summary').reply(200, { cards: summaryCards });
mock.onGet('/dashboard/charts').reply(200, {
  mealPie: mealPieData,
  dailyTrend: dailyTrendData,
});
mock.onGet('/dashboard/hourly').reply(200, { hourly: hourlyData });
mock.onGet('/dashboard/weekly').reply(200, { weekly: weeklyData });
mock.onGet('/dashboard/consumption').reply(200, { consumption: consumptionTrendData });

// RECOGNITION
mock.onGet('/recognition/latest').reply(200, { records: recognizedPersons });

// DUPLICATES
mock.onGet('/duplicates').reply(200, { records: duplicateAttempts });

// CAMERAS
mock.onGet('/cameras').reply(200, { cameras });
mock.onAny(/\/cameras\/\d+/).reply(200, { ok: true });

// INSIGHTS & ACTIVITIES
mock.onGet('/insights').reply(200, { insights: aiInsights });
mock.onGet('/activities').reply(200, { activities: recentActivities });

// PREDICTIONS
mock.onGet('/predictions/tomorrow').reply(200, { prediction: predictions });
mock.onGet('/predictions/forecast').reply(200, {
  forecast: [
    { day: 'Mon', predicted: 920,  actual: 892  },
    { day: 'Tue', predicted: 950,  actual: 940  },
    { day: 'Wed', predicted: 930,  actual: 918  },
    { day: 'Thu', predicted: 970,  actual: 965  },
    { day: 'Fri', predicted: 1050, actual: null },
    { day: 'Sat', predicted: 720,  actual: null },
    { day: 'Sun', predicted: 680,  actual: null },
  ],
});

// PERSONS
const personsList = [
  { id: 'EMP001', name: 'Rahul Sharma', dept: 'Engineering', meals: 45, status: 'active'   },
  { id: 'EMP002', name: 'Priya Singh',  dept: 'Marketing',   meals: 42, status: 'active'   },
  { id: 'EMP003', name: 'Amit Kumar',   dept: 'Finance',     meals: 38, status: 'active'   },
  { id: 'EMP004', name: 'Sneha Patel',  dept: 'HR',          meals: 50, status: 'active'   },
  { id: 'EMP005', name: 'Vikram Nair',  dept: 'Engineering', meals: 30, status: 'active'   },
  { id: 'EMP006', name: 'Anita Rao',    dept: 'Operations',  meals: 44, status: 'active'   },
  { id: 'EMP007', name: 'Ravi Verma',   dept: 'Logistics',   meals: 35, status: 'inactive' },
  { id: 'EMP008', name: 'Meera Joshi',  dept: 'Engineering', meals: 48, status: 'active'   },
];
mock.onGet('/persons').reply(200, { persons: personsList, total: personsList.length });
mock.onPost('/persons').reply(201, { ok: true });
mock.onAny(/\/persons\/.+/).reply(200, { ok: true });

// DISTRIBUTION
mock.onGet('/distribution/status').reply(200, {
  meals: [
    { meal: 'Breakfast', time: '7:00 AM – 9:30 AM', served: 312, total: 330, status: 'completed' },
    { meal: 'Lunch',     time: '12:00 PM – 2:30 PM', served: 415, total: 500, status: 'ongoing'   },
    { meal: 'Dinner',    time: '7:00 PM – 9:00 PM',  served: 0,   total: 350, status: 'upcoming'  },
  ],
});

// ANALYTICS
mock.onGet('/analytics/stats').reply(200, {
  stats: [
    { label: 'Avg Daily Visitors', value: '892',    sub: 'Last 7 days'   },
    { label: 'Peak Hour',          value: '12–1 PM', sub: 'Lunch time'   },
    { label: 'Busiest Day',        value: 'Friday',  sub: '330 breakfast' },
    { label: 'Efficiency Rate',    value: '97.2%',   sub: 'Distribution'  },
  ],
});

// REPORTS
mock.onGet('/reports/list').reply(200, {
  history: [
    { name: 'Daily Report – Jul 28',  gen: '28 Jul 2026  09:00 AM', period: '28 Jul 2026', records: 892,   key: 'daily'   },
    { name: 'Weekly Report – Wk 30',  gen: '27 Jul 2026  11:00 PM', period: 'Jul 21–27',   records: 5890,  key: 'weekly'  },
    { name: 'Monthly Report – Jun',   gen: '01 Jul 2026  01:00 AM', period: 'June 2026',    records: 25340, key: 'monthly' },
  ],
});
mock.onPost('/reports/generate').reply(200, { ok: true });

// SETTINGS
mock.onGet('/settings').reply(200, {
  confidenceThreshold: 85,
  duplicateInterval: 30,
  maxAttempts: 3,
});
mock.onPatch('/settings/profile').reply(200, { ok: true });
mock.onPatch('/settings/password').reply(200, { ok: true });
mock.onPatch('/settings/camera').reply(200, { ok: true });

export default mock;
