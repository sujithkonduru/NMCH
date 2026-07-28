/**
 * API Services — all endpoint functions grouped by domain.
 * Base URL is set in src/api/axios.js via VITE_API_BASE_URL env var.
 *
 * Expected backend routes (REST):
 *   POST   /auth/login
 *   POST   /auth/logout
 *   GET    /dashboard/summary
 *   GET    /dashboard/charts
 *   GET    /dashboard/hourly
 *   GET    /dashboard/weekly
 *   GET    /dashboard/consumption
 *   GET    /recognition/latest       ?limit=&meal=&status=
 *   GET    /duplicates               ?date=
 *   GET    /cameras
 *   PATCH  /cameras/:id
 *   GET    /insights
 *   GET    /activities               ?limit=
 *   GET    /predictions/tomorrow
 *   GET    /persons                  ?search=&status=&page=&limit=
 *   POST   /persons
 *   PATCH  /persons/:id
 *   DELETE /persons/:id
 *   GET    /distribution/status
 *   GET    /analytics/stats
 *   GET    /reports/list
 *   POST   /reports/generate         { type, format }
 *   GET    /settings
 *   PATCH  /settings/profile
 *   PATCH  /settings/password
 *   PATCH  /settings/camera
 */

import api from './axios';

/* ─── AUTH ─────────────────────────────────────────────────── */
export const authAPI = {
  login:  (email, password) => api.post('/auth/login',  { email, password }),
  logout: ()                => api.post('/auth/logout'),
  me:     ()                => api.get('/auth/me'),
};

/* ─── DASHBOARD ─────────────────────────────────────────────── */
export const dashboardAPI = {
  getSummary:     ()       => api.get('/dashboard/summary'),
  getChartData:   ()       => api.get('/dashboard/charts'),
  getHourly:      ()       => api.get('/dashboard/hourly'),
  getWeekly:      ()       => api.get('/dashboard/weekly'),
  getConsumption: ()       => api.get('/dashboard/consumption'),
};

/* ─── RECOGNITION ───────────────────────────────────────────── */
export const recognitionAPI = {
  getLatest: (params = {}) => api.get('/recognition/latest', { params }),
  // params: { limit, meal, status, search }
};

/* ─── DUPLICATES ────────────────────────────────────────────── */
export const duplicatesAPI = {
  getAll: (date) => api.get('/duplicates', { params: { date } }),
};

/* ─── CAMERAS ───────────────────────────────────────────────── */
export const camerasAPI = {
  getAll:  ()          => api.get('/cameras'),
  update:  (id, data)  => api.patch(`/cameras/${id}`, data),
};

/* ─── AI INSIGHTS & ACTIVITIES ──────────────────────────────── */
export const insightsAPI = {
  getInsights:   ()         => api.get('/insights'),
  getActivities: (limit=20) => api.get('/activities', { params: { limit } }),
};

/* ─── PREDICTIONS ───────────────────────────────────────────── */
export const predictionsAPI = {
  getTomorrow:  ()     => api.get('/predictions/tomorrow'),
  getForecast:  ()     => api.get('/predictions/forecast'),
};

/* ─── PERSONS ───────────────────────────────────────────────── */
export const personsAPI = {
  getAll:   (params = {}) => api.get('/persons', { params }),
  // params: { search, status, page, limit }
  create:   (data)        => api.post('/persons', data),
  update:   (id, data)    => api.patch(`/persons/${id}`, data),
  remove:   (id)          => api.delete(`/persons/${id}`),
};

/* ─── FOOD DISTRIBUTION ─────────────────────────────────────── */
export const distributionAPI = {
  getStatus: () => api.get('/distribution/status'),
};

/* ─── ANALYTICS ─────────────────────────────────────────────── */
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
};

/* ─── REPORTS ───────────────────────────────────────────────── */
export const reportsAPI = {
  getList:     ()              => api.get('/reports/list'),
  generate:    (type, format)  => api.post('/reports/generate', { type, format }),
};

/* ─── SETTINGS ──────────────────────────────────────────────── */
export const settingsAPI = {
  get:             ()       => api.get('/settings'),
  updateProfile:   (data)   => api.patch('/settings/profile',  data),
  updatePassword:  (data)   => api.patch('/settings/password', data),
  updateCamera:    (data)   => api.patch('/settings/camera',   data),
};
