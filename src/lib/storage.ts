import { Goal } from '../types';

const STORAGE_KEY = 'life_designer_goals';
const THEME_KEY = 'life_designer_theme';

export const saveGoals = (goals: Goal[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals:', error);
  }
};

export const loadGoals = (): Goal[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading goals:', error);
    return [];
  }
};

export const saveTheme = (theme: string) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const loadTheme = (): string => {
  try {
    return localStorage.getItem(THEME_KEY) || 'cinematic';
  } catch (error) {
    console.error('Error loading theme:', error);
    return 'cinematic';
  }
};

export const exportData = (goals: Goal[]): string => {
  return JSON.stringify({ goals, exportedAt: new Date().toISOString() }, null, 2);
};

export const importData = (jsonString: string): Goal[] | null => {
  try {
    const data = JSON.parse(jsonString);
    if (data.goals && Array.isArray(data.goals)) {
      return data.goals;
    }
    return null;
  } catch (error) {
    console.error('Error importing data:', error);
    return null;
  }
};
