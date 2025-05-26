"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const monthlySalesData = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 3800 },
  { name: "Mar", value: 5100 },
  { name: "Apr", value: 4800 },
  { name: "May", value: 5500 },
  { name: "Jun", value: 4900 },
  { name: "Jul", value: 5300 },
  { name: "Aug", value: 5700 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6B6B",
  "#4FD1C5",
  "#F687B3",
];

export default class MonthlySellingPieChart extends PureComponent {
  render() {
    return (
      <div className="min-h-[400px] w-full bg-white p-[16px] xl:w-[450px] 2xl:w-[500px]">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={monthlySalesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {monthlySalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-info">
          <p>
            Total Sales: $
            {monthlySalesData.reduce((sum, month) => sum + month.value, 0).toLocaleString()} in this
            months
          </p>
        </div>
      </div>
    );
  }
}
