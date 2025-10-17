import { motion } from 'motion/react';
import { Goal } from '../types';
import { CATEGORIES } from '../lib/constants';
import { Check, Edit, Trash2, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { useState } from 'react';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleAchieved: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  cardBg: string;
  isDragging?: boolean;
  isMobileGrid?: boolean;
  textColor?: string;
}

export function GoalCard({
  goal,
  onEdit,
  onDelete,
  onToggleAchieved,
  onPositionChange,
  cardBg,
  isDragging = false,
  isMobileGrid = false,
  textColor = 'text-white',
}: GoalCardProps) {
  const [isDraggingLocal, setIsDraggingLocal] = useState(false);
  const category = CATEGORIES[goal.category];

  // Mobile Grid Layout (no drag, stacked)
  if (isMobileGrid) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full group"
      >
        <div
          className={`relative rounded-2xl overflow-hidden ${cardBg} border-2 shadow-2xl ${
            goal.achieved ? 'opacity-75' : ''
          }`}
        >
          {/* Image Section */}
          {goal.image && (
            <div className="relative h-56 overflow-hidden">
              <ImageWithFallback
                src={goal.image}
                alt={goal.title}
                className="w-full h-full object-cover"
              />
              {goal.achieved && (
                <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}>
                  <div className="bg-green-500 rounded-full p-3">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-4 flex flex-col">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white text-xs`}>
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </div>
              {goal.emoji && !goal.image && (
                <span className="text-4xl">{goal.emoji}</span>
              )}
            </div>

            {/* Title */}
            <h3 className={`${textColor} mb-2`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{goal.title}</h3>

            {/* Description */}
            {goal.description && (
              <p className={`${textColor} opacity-80 text-sm mb-3`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {goal.description}
              </p>
            )}

            {/* Target */}
            {(goal.targetAge || goal.targetYear) && (
              <div className={`flex items-center gap-2 ${textColor} opacity-70 text-sm mb-4`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                <Calendar className="w-4 h-4" />
                <span>
                  {goal.targetAge && `Before ${goal.targetAge}`}
                  {goal.targetAge && goal.targetYear && ' • '}
                  {goal.targetYear && `${goal.targetYear}`}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onToggleAchieved(goal.id)}
                className={`${textColor} flex-1`}
                style={{ 
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  backgroundColor: goal.achieved ? 'rgba(34, 197, 94, 0.3)' : undefined
                }}
              >
                <Check className="w-4 h-4 mr-2" />
                {goal.achieved ? 'Achieved' : 'Mark Done'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(goal)}
                className={textColor}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(goal.id)}
                className={textColor}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop Canvas Layout (draggable)
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDraggingLocal(true)}
      onDragEnd={(_, info) => {
        setIsDraggingLocal(false);
        onPositionChange(goal.id, {
          x: goal.position.x + info.offset.x,
          y: goal.position.y + info.offset.y,
        });
      }}
      style={{
        position: 'absolute',
        left: goal.position.x,
        top: goal.position.y,
        width: goal.size.width,
        height: goal.size.height,
      }}
      className={`cursor-move group ${isDraggingLocal ? 'z-50' : 'z-10'}`}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.05, rotate: 2 }}
    >
      <div
        className={`relative rounded-2xl overflow-hidden ${cardBg} border-2 shadow-2xl h-full flex flex-col ${
          goal.achieved ? 'opacity-75' : ''
        }`}
      >
        {/* Image Section */}
        {goal.image && (
          <div className="relative h-56 overflow-hidden">
            <ImageWithFallback
              src={goal.image}
              alt={goal.title}
              className="w-full h-full object-cover"
            />
            {goal.achieved && (
              <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}>
                <div className="bg-green-500 rounded-full p-3">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-2">
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white text-xs`}>
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </div>
            {goal.emoji && !goal.image && (
              <span className="text-4xl">{goal.emoji}</span>
            )}
          </div>

          {/* Title */}
          <h3 className={`${textColor} mb-2 line-clamp-2`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{goal.title}</h3>

          {/* Description */}
          {goal.description && (
            <p className={`${textColor} opacity-80 text-sm mb-3 line-clamp-3 flex-1`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              {goal.description}
            </p>
          )}

          {/* Target */}
          {(goal.targetAge || goal.targetYear) && (
            <div className={`flex items-center gap-2 ${textColor} opacity-70 text-sm mb-3`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              <Calendar className="w-4 h-4" />
              <span>
                {goal.targetAge && `Before ${goal.targetAge}`}
                {goal.targetAge && goal.targetYear && ' • '}
                {goal.targetYear && `${goal.targetYear}`}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleAchieved(goal.id)}
              className={textColor}
              style={{ 
                backgroundColor: goal.achieved ? 'rgba(34, 197, 94, 0.3)' : undefined
              }}
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(goal)}
              className={textColor}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(goal.id)}
              className={textColor}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
