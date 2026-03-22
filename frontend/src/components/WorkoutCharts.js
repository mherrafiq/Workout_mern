import React, { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList
} from 'recharts'
import format from 'date-fns/format'

const COLORS = ['#14b8a6', '#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f59e0b'];

const WorkoutCharts = ({ workouts }) => {
  // Process data for Load & Reps Trend
  const trendData = useMemo(() => {
    if (!workouts || workouts.length === 0) return []

    // Sort by date ascending
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    // Group by date to see daily averages
    const groupedData = sortedWorkouts.reduce((acc, workout) => {
      const date = format(new Date(workout.createdAt), 'MMM dd')
      if (!acc[date]) {
        acc[date] = { loadTotal: 0, repsTotal: 0, count: 0, exercises: [] }
      }
      acc[date].loadTotal += workout.load
      acc[date].repsTotal += workout.reps
      acc[date].count += 1
      if (!acc[date].exercises.includes(workout.title)) {
        acc[date].exercises.push(workout.title)
      }
      return acc
    }, {})

    return Object.keys(groupedData).map(date => ({
      date,
      avgLoad: Math.round(groupedData[date].loadTotal / groupedData[date].count),
      avgReps: Math.round(groupedData[date].repsTotal / groupedData[date].count),
      exercises: groupedData[date].exercises.join(', ')
    }))
  }, [workouts])

  // Process data for Exercise Metrics (Bar Chart)
  const exerciseMetrics = useMemo(() => {
    if (!workouts || workouts.length === 0) return []

    const groups = workouts.reduce((acc, workout) => {
      const title = workout.title.charAt(0).toUpperCase() + workout.title.slice(1).toLowerCase()
      if (!acc[title]) {
        acc[title] = { loadTotal: 0, repsTotal: 0, count: 0 }
      }
      acc[title].loadTotal += workout.load
      acc[title].repsTotal += workout.reps
      acc[title].count += 1
      return acc
    }, {})

    return Object.keys(groups).map(name => ({
      name,
      avgLoad: Math.round(groups[name].loadTotal / groups[name].count),
      avgReps: Math.round(groups[name].repsTotal / groups[name].count)
    })).sort((a, b) => b.avgLoad - a.avgLoad).slice(0, 5)
  }, [workouts])

  // Process data for Exercise Mix (Pie)
  const distributionData = useMemo(() => {
    if (!workouts || workouts.length === 0) return []
    const counts = workouts.reduce((acc, workout) => {
      const title = workout.title.charAt(0).toUpperCase() + workout.title.slice(1).toLowerCase()
      acc[title] = (acc[title] || 0) + 1
      return acc
    }, {})
    return Object.keys(counts).map(name => ({
      name,
      value: counts[name]
    })).sort((a, b) => b.value - a.value)
  }, [workouts])

  if (!workouts || workouts.length === 0) {
    return null
  }

  return (
    <div className="charts-container">
      <div className="chart-card trend-chart full-width">
        <h3>Load (kg) & Reps Trend</h3>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#14b8a6" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Load (kg)', angle: -90, position: 'insideLeft', fill: '#14b8a6', offset: 10 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Reps', angle: 90, position: 'insideRight', fill: '#f59e0b', offset: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', backdropFilter: 'blur(10px)' }}
                formatter={(value, name) => [value, name === 'avgLoad' ? 'Avg Load (kg)' : 'Avg Reps']}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line yAxisId="left" type="monotone" dataKey="avgLoad" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6', r: 4 }}>
                <LabelList dataKey="avgLoad" position="top" fill="#14b8a6" fontSize={10} offset={10} />
              </Line>
              <Line yAxisId="right" type="monotone" dataKey="avgReps" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 4 }}>
                <LabelList dataKey="avgReps" position="bottom" fill="#f59e0b" fontSize={10} offset={10} />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card metrics-chart">
        <h3>Avg Load & Reps per Exercise</h3>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={exerciseMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', backdropFilter: 'blur(10px)' }} />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="avgLoad" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Avg Load (kg)">
                <LabelList dataKey="avgLoad" position="top" fill="#14b8a6" fontSize={10} />
              </Bar>
              <Bar dataKey="avgReps" fill="#6366f1" radius={[4, 4, 0, 0]} name="Avg Reps">
                <LabelList dataKey="avgReps" position="top" fill="#6366f1" fontSize={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card pie-chart">
        <h3>Exercise Mix (Total Hits)</h3>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <PieChart>
              <defs>
                {distributionData.map((entry, index) => (
                  <linearGradient id={`colorGradient-${index}`} key={index} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.3}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie data={distributionData} innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value" stroke="none">
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#colorGradient-${index})`} style={{ filter: `drop-shadow(0 0 8px ${COLORS[index % COLORS.length]}44)` }} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', backdropFilter: 'blur(10px)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center-text">
            <span className="total-label">Total</span>
            <span className="total-value">{workouts.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutCharts
