import {motion} from "framer-motion"
interface Stat {
    title: string;
    value: number;
}
export default function StatCard({ title, value }: Stat) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-[#1c0333] rounded-2xl p-6 shadow-lg dark:shadow-sm dark:shadow-violet-500/40  dark:hover:shadow-violet-500/50 border border-violet-100 dark:border-neutral-800 hover:shadow-xl transition dark:hover:shadow-md"
        >
            <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
            <h3 className="text-3xl font-bold text-violet-600 mt-2">
                {value}
            </h3>
        </motion.div>
    );
}