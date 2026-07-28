import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import { mealPieData, dailyTrendData, hourlyData, weeklyData, consumptionTrendData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '10px 14px', minWidth: 120,
      boxShadow: 'var(--shadow-md)',
    }}>
      {label && <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: 12, fontWeight: 600, color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const Card = ({ children, delay, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, ease: [0.16, 1, 0.3, 1] }}
    style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 20,
      boxShadow: 'var(--shadow-sm)',
      minWidth: 0,
      ...style,
    }}
  >
    {children}
  </motion.div>
);

const ChartTitle = ({ children }) => (
  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>{children}</p>
);

const tickStyle = { fontSize: 11, fill: 'var(--text-muted)' };
const gridStroke = 'var(--border)';

export default function LiveCharts() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Row 1: Pie (1/3) + Daily Line (2/3) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }} className="charts-row-1">
        {/* Pie */}
        <Card delay={0.05}>
          <ChartTitle>Meal Distribution</ChartTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={mealPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={4} dataKey="value">
                {mealPieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8 }}>
            {mealPieData.map(d => (
              <div key={d.name} style={{ textAlign: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, margin: '0 auto 4px' }} />
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.name}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{d.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Line */}
        <Card delay={0.1}>
          <ChartTitle>Daily Distribution Trend</ChartTitle>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailyTrendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="day" tick={tickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={v => <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{v}</span>} />
              <Line type="monotone" dataKey="breakfast" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} name="Breakfast" />
              <Line type="monotone" dataKey="lunch"     stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} name="Lunch" />
              <Line type="monotone" dataKey="dinner"    stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3, fill: '#8b5cf6' }} name="Dinner" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 2: Bar Hourly (2/3) + Area Weekly (1/3) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }} className="charts-row-2">
        {/* Hourly Bar */}
        <Card delay={0.15}>
          <ChartTitle>Hourly Distribution</ChartTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Persons" radius={[6, 6, 0, 0]}>
                {hourlyData.map((_, i) => (
                  <Cell key={i} fill={i < 4 ? '#f59e0b' : i < 8 ? '#3b82f6' : '#8b5cf6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Area */}
        <Card delay={0.2}>
          <ChartTitle>Weekly Distribution</ChartTitle>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="weekGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2.5} fill="url(#weekGrad)" name="Total" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Row 3: Consumption Line (full width) */}
      <Card delay={0.25}>
        <ChartTitle>Food Consumption Trend (kg)</ChartTitle>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={consumptionTrendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="month" tick={tickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={v => <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{v}</span>} />
            <Line type="monotone" dataKey="rice" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} name="Rice" />
            <Line type="monotone" dataKey="dal"  stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} name="Dal" />
            <Line type="monotone" dataKey="veg"  stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} name="Vegetables" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
