import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TemperatureChart({ chartData }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Temperature Trend (Next 24 Hours)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
