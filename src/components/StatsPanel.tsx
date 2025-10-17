import { Goal } from '../types';
import { Trophy, Target, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsPanelProps {
  goals: Goal[];
  textColor?: string;
}

export function StatsPanel({ goals, textColor = 'text-white' }: StatsPanelProps) {
  const totalGoals = goals.length;
  const achievedGoals = goals.filter(g => g.achieved).length;
  const activeGoals = totalGoals - achievedGoals;
  const completionRate = totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0;

  if (totalGoals === 0) return null;

  const stats = [
    { label: 'Total Goals', value: totalGoals, icon: Target, color: 'from-blue-400 to-blue-600' },
    { label: 'Active', value: activeGoals, icon: TrendingUp, color: 'from-purple-400 to-purple-600' },
    { label: 'Achieved', value: achievedGoals, icon: CheckCircle2, color: 'from-green-400 to-green-600' },
    { label: 'Completion', value: `${completionRate}%`, icon: Trophy, color: 'from-amber-400 to-amber-600' },
  ];

  return (
    <>
      {/* Desktop Stats Panel */}
      <div className="fixed top-24 right-8 z-30 flex-col gap-2 hidden xl:flex">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 min-w-[140px]"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className={`${textColor} opacity-70 text-xs`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{stat.label}</p>
                <p className={textColor} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Stats Bar */}
      <div className="fixed bottom-24 left-0 right-0 z-30 xl:hidden px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className={`${textColor} opacity-70 text-[10px]`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{stat.label}</p>
                  <p className={`${textColor} text-sm`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
