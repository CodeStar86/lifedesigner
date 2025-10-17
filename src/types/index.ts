export type Category = 'health' | 'relationships' | 'career' | 'finances' | 'growth' | 'adventure';

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAge?: number;
  targetYear?: number;
  image?: string;
  emoji?: string;
  category: Category;
  position: { x: number; y: number };
  size: { width: number; height: number };
  achieved: boolean;
  createdAt: number;
}

export interface Theme {
  name: string;
  gradient: string;
  textColor: string;
  cardBg: string;
}

export interface CategoryConfig {
  label: string;
  color: string;
  icon: string;
}
