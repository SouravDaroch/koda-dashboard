"use client";

import { useEffect, useState } from "react";
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
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);
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
                            interval={0}
                            tickFormatter={(value) =>
                                value.length > 5 ? value.slice(0, 5) + "…" : value
                            }
                        />

                        <YAxis
                            domain={[0, 100]}
                            tick={{ fontSize: 12 }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: isDark ? "#110121" : "#f3f4f6" }}
                        />

                        <Bar
                            dataKey="progress"
                            fill="#7F22FE"
                            radius={[6, 6, 0, 0]}
                            minPointSize={5}
                            maxBarSize={40}
                            label={{ position: "top", fontSize: 12 }}
                            activeBar={{ fill: "#7F22FE" }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}



function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 shadow-md">
            <p className="text-sm text-gray-700 dark:text-gray-200">
                {label}
            </p>

            <p className="text-sm font-semibold text-violet-600">
                Progress: {payload[0].value}%
            </p>
        </div>
    );
}