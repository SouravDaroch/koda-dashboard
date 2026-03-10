"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

interface Props {
  data: {
    name: string;
    progress: number;
  }[];
}

export default function ProjectProgressChart({ data }: Props) {
  return (
    <div className="bg-white dark:bg-[#1c0333] rounded-2xl shadow-sm border border-violet-100 dark:border-neutral-800 p-6">

      <h3 className="text-lg font-semibold mb-6">
        Project Progress
      </h3>

      <div className="h-57.5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              className="opacity-20"
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Bar
              dataKey="progress"
              fill="#7F22FE"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}