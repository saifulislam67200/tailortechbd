"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 4200, color: "#3B82F6" },
  { name: "Feb", value: 3800, color: "#10B981" },
  { name: "Mar", value: 5100, color: "#F59E0B" },
  { name: "Apr", value: 4800, color: "#EF4444" },
  { name: "May", value: 5500, color: "#8B5CF6" },
  { name: "Jun", value: 4900, color: "#EC4899" },
  { name: "Jul", value: 5300, color: "#14B8A6" },
  { name: "Aug", value: 5700, color: "#F97316" },
  { name: "Sep", value: 6000, color: "#6366F1" },
  { name: "Oct", value: 6200, color: "#22D3EE" },
  { name: "Nov", value: 5800, color: "#A3E635" },
  { name: "Dec", value: 6500, color: "#F43F5E" },
];

const MinimalSalesChart = () => {
  const totalSales = data.reduce((sum, month) => sum + month.value, 0);

  return (
    <div className="w-full rounded-[5px] bg-white p-[16px] xl:w-[400px] 2xl:w-[450px]">
      <div className="mb-4">
        <h2 className="text-[14px] font-bold text-black sm:text-[16px]">Earnings This Year</h2>
        <p className="mt-1 text-[16px] font-semibold text-info">${totalSales.toLocaleString()}</p>
      </div>

      <div className="h-62 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name }) => name}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={1} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [`$${value.toLocaleString()}`, props.payload.name]}
              contentStyle={{
                borderRadius: "6px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MinimalSalesChart;
