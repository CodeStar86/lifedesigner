import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface WatermarkProps {
  visible?: boolean;
  textColor?: string;
}

export function Watermark({ visible = true, textColor = 'text-white' }: WatermarkProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 left-4 z-30 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10"
    >
      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
      <span className={`${textColor} opacity-80 text-xs sm:text-sm`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Life Designer</span>
    </motion.div>
  );
}
