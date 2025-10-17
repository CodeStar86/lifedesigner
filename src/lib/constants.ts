import { Theme, CategoryConfig, Category } from '../types';

export const THEMES: Record<string, Theme> = {
  calm: {
    name: 'Calm',
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    textColor: 'text-white',
    cardBg: 'bg-white/10 backdrop-blur-lg border-white/20',
  },
  luxury: {
    name: 'Luxury',
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    textColor: 'text-white',
    cardBg: 'bg-black/30 backdrop-blur-lg border-amber-500/30',
  },
  cinematic: {
    name: 'Cinematic',
    gradient: 'from-fuchsia-500 via-purple-600 to-indigo-700',
    textColor: 'text-white',
    cardBg: 'bg-black/40 backdrop-blur-xl border-purple-500/30',
  },
  pastel: {
    name: 'Pastel Dream',
    gradient: 'from-pink-300 via-purple-300 to-indigo-400',
    textColor: 'text-gray-800',
    cardBg: 'bg-white/80 backdrop-blur-md border-white/40',
  },
  emerald: {
    name: 'Emerald',
    gradient: 'from-teal-400 via-emerald-500 to-green-600',
    textColor: 'text-white',
    cardBg: 'bg-white/10 backdrop-blur-lg border-emerald-500/30',
  },
  dark: {
    name: 'Dark Mode',
    gradient: 'from-gray-900 via-gray-800 to-gray-900',
    textColor: 'text-white',
    cardBg: 'bg-white/5 backdrop-blur-lg border-white/10',
  },
};

export const CATEGORIES: Record<Category, CategoryConfig> = {
  health: {
    label: 'Health',
    color: 'from-green-400 to-emerald-600',
    icon: '💪',
  },
  relationships: {
    label: 'Relationships',
    color: 'from-pink-400 to-rose-600',
    icon: '❤️',
  },
  career: {
    label: 'Career',
    color: 'from-blue-400 to-indigo-600',
    icon: '💼',
  },
  finances: {
    label: 'Finances',
    color: 'from-yellow-400 to-amber-600',
    icon: '💰',
  },
  growth: {
    label: 'Personal Growth',
    color: 'from-purple-400 to-violet-600',
    icon: '🌱',
  },
  adventure: {
    label: 'Adventure',
    color: 'from-orange-400 to-red-600',
    icon: '✈️',
  },
};

export const DEFAULT_CARD_SIZE = { width: 320, height: 400 };
