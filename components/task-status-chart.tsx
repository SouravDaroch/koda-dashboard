"use client";
import {motion} from "framer-motion"
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Label
} from "recharts";

interface Props {
    completed: number;
    inProgress: number;
    planning: number;
}


export default function TaskStatusChart({
    completed,
    inProgress,
    planning
}: Props) {

    const total = completed + inProgress + planning;

    const COLORS = total === 0
        ? ["#d4d4d4"] : ["#7F22FE", "#BB8AFE", "#D1CDD4"];

    const data =
        total === 0
            ? [{ name: "No Tasks", value: 1 }]
            : [
                { name: "Completed", value: completed },
                { name: "In Progress", value: inProgress },
                { name: "Planning", value: planning }
            ];

    return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }} className="bg-white dark:bg-[#1c0333] rounded-2xl shadow-sm border border-violet-100 dark:border-neutral-800 p-5">

            <h3 className="text-xl font-semibold mb-4">
                Task Status
            </h3>
            <div className="flex items-center justify-between">
                <ResponsiveContainer width="50%" height={230}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={3}
                            stroke="none"
                        >
                            {data.map((_, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}

                            <Label
                                position="center"
                                content={() => (
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x="50%"
                                            dy="-0.2em"
                                            className="dark:fill-gray-200 text-2xl font-bold"
                                        >
                                            {total}
                                        </tspan>
                                        <tspan
                                            x="50%"
                                            dy="1.4em"
                                            className="fill-gray-500 text-sm p-2"
                                        >
                                            Total Tasks
                                        </tspan>
                                    </text>
                                )}
                            />
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3  text-sm">

                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#7F22FE]" />
                        <p className="flex justify-between w-32">
                            Completed
                            <span className="font-semibold">{completed}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#BB8AFE]" />
                        <p className="flex justify-between w-32">
                            In Progress
                            <span className="font-semibold">{inProgress}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#D1CDD4]" />
                        <p className="flex justify-between w-32">
                            Planning
                            <span className="font-semibold">{planning}</span>
                        </p>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}