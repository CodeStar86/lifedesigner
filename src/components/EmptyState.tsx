import { Plus, Sparkles, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface EmptyStateProps {
  onAddGoal: () => void;
  onLoadExamples?: () => void;
  textColor?: string;
}

export function EmptyState({ onAddGoal, onLoadExamples, textColor = 'text-white' }: EmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto px-4 sm:px-6"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="text-6xl sm:text-8xl mb-6"
        >
          ✨
        </motion.div>
        
        <h2 className={`${textColor} text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 px-2`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Start Designing Your Future</h2>
        
        <p className={`${textColor} opacity-80 text-sm sm:text-base mb-6 sm:mb-8 px-2`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
          Create your dream vision board with goals, affirmations, and milestones.
          Everything stays private on your device.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Button
            onClick={onAddGoal}
            size="lg"
            className="bg-white text-purple-900 hover:bg-white/90 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Goal
          </Button>
          
          {onLoadExamples && (
            <Button
              onClick={onLoadExamples}
              size="lg"
              variant="outline"
              className={`border-white/50 ${textColor} hover:bg-white/20 w-full sm:w-auto bg-white/10 backdrop-blur-sm shadow-lg`}
              style={{ fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Load Examples
            </Button>
          )}
        </div>

        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 ${textColor} opacity-60 text-xs sm:text-sm`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>No Login Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Completely Free</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
