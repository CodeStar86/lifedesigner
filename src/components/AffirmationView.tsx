import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Goal } from '../types';
import { CATEGORIES } from '../lib/constants';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AffirmationViewProps {
  goals: Goal[];
  onClose: () => void;
}

export function AffirmationView({ goals, onClose }: AffirmationViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const activeGoals = goals.filter(g => !g.achieved);
  const currentGoal = activeGoals[currentIndex];

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeGoals.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, activeGoals.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeGoals.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeGoals.length) % activeGoals.length);
  };

  if (activeGoals.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-3xl mb-4">No active goals yet</h2>
          <p className="text-white/70 mb-6">Add some goals to see affirmations</p>
          <Button onClick={onClose} variant="outline" className="!text-black hover:!text-black border-white/30 hover:bg-white/10 bg-white">
            Back to Canvas
          </Button>
        </div>
      </div>
    );
  }

  const category = CATEGORIES[currentGoal.category];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
      {/* Close Button */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-white hover:bg-white/10"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>

      {/* Auto-play Toggle */}
      <Button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        variant="ghost"
        size="sm"
        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 text-white hover:bg-white/10 px-2 sm:px-3"
      >
        {isAutoPlay ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />}
        <span className="hidden sm:inline">{isAutoPlay ? 'Pause' : 'Auto-play'}</span>
      </Button>

      {/* Progress Indicator */}
      <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
        {activeGoals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-6 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="h-full flex items-center justify-center px-4 sm:px-8 pt-20 pb-24 sm:pt-24 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGoal.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full text-center"
          >
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r ${category.color} text-white mb-6`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span>{category.label}</span>
            </motion.div>

            {/* Image */}
            {currentGoal.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl overflow-hidden max-w-2xl mx-auto shadow-2xl w-full"
                style={{ minHeight: '200px' }}
              >
                <ImageWithFallback
                  src={currentGoal.image}
                  alt={currentGoal.title}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover block"
                  style={{ display: 'block' }}
                />
              </motion.div>
            )}

            {/* Emoji */}
            {currentGoal.emoji && !currentGoal.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-9xl mb-8"
              >
                {currentGoal.emoji}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 px-2"
            >
              {currentGoal.title}
            </motion.h1>

            {/* Description */}
            {currentGoal.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/80 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-6 sm:mb-8 px-4"
              >
                {currentGoal.description}
              </motion.p>
            )}

            {/* Target */}
            {(currentGoal.targetAge || currentGoal.targetYear) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-white/60 text-lg"
              >
                {currentGoal.targetAge && `Before age ${currentGoal.targetAge}`}
                {currentGoal.targetAge && currentGoal.targetYear && ' • '}
                {currentGoal.targetYear && `Year ${currentGoal.targetYear}`}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        <Button
          onClick={handlePrev}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>
        <div className="text-white/60 text-sm sm:text-base">
          {currentIndex + 1} / {activeGoals.length}
        </div>
        <Button
          onClick={handleNext}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>
      </div>
    </div>
  );
}
