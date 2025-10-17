import { useState, useEffect, useRef } from 'react';
import { Goal } from './types';
import { THEMES } from './lib/constants';
import { saveGoals, loadGoals, saveTheme, loadTheme, exportData, importData } from './lib/storage';
import { EXAMPLE_GOALS } from './lib/examples';
import { Header } from './components/Header';
import { GoalCard } from './components/GoalCard';
import { AddGoalModal } from './components/AddGoalModal';
import { AffirmationView } from './components/AffirmationView';
import { EmptyState } from './components/EmptyState';
import { Watermark } from './components/Watermark';
import { StatsPanel } from './components/StatsPanel';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import html2canvas from 'html2canvas';
import { useIsMobile } from './components/ui/use-mobile';

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [currentTheme, setCurrentTheme] = useState('cinematic');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'affirmations'>('canvas');
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Load data on mount
  useEffect(() => {
    const loadedGoals = loadGoals();
    const loadedTheme = loadTheme();
    setGoals(loadedGoals);
    setCurrentTheme(loadedTheme);
  }, []);

  // Save goals whenever they change
  useEffect(() => {
    if (goals.length > 0 || localStorage.getItem('life_designer_goals')) {
      saveGoals(goals);
    }
  }, [goals]);

  // Save theme whenever it changes
  useEffect(() => {
    saveTheme(currentTheme);
  }, [currentTheme]);

  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    if (editingGoal) {
      // Update existing goal
      setGoals((prev) =>
        prev.map((g) =>
          g.id === editingGoal.id
            ? { ...goalData, id: editingGoal.id, createdAt: editingGoal.createdAt }
            : g
        )
      );
      toast.success('Goal updated successfully!');
    } else {
      // Add new goal
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      setGoals((prev) => [...prev, newGoal]);
      toast.success('Goal added successfully!');
    }
    setEditingGoal(null);
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    toast.success('Goal deleted');
  };

  const handleToggleAchieved = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, achieved: !g.achieved } : g))
    );
  };

  const handlePositionChange = (id: string, position: { x: number; y: number }) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, position } : g))
    );
  };

  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    
    try {
      toast.info('Generating image...');
      
      // Use foreign object rendering which handles modern CSS better
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
      });
      
      const link = document.createElement('a');
      link.download = `life-designer-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success('Vision board exported!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(`Failed to export: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleExportJSON = () => {
    const data = exportData(goals);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `life-designer-data-${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported!');
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const imported = importData(content);
        if (imported) {
          setGoals(imported);
          toast.success('Data imported successfully!');
        } else {
          toast.error('Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleLoadExamples = () => {
    const exampleGoalsWithIds: Goal[] = EXAMPLE_GOALS.map((goal, index) => ({
      ...goal,
      id: `example-${Date.now()}-${index}`,
      createdAt: Date.now() + index,
    }));
    setGoals(exampleGoalsWithIds);
    toast.success('Example goals loaded!');
  };

  const handleResetToHome = () => {
    // Only clear goals if they are all examples (IDs start with "example-")
    const areAllExamples = goals.length > 0 && goals.every(goal => goal.id.startsWith('example-'));
    
    if (areAllExamples) {
      setGoals([]);
      toast.success('Examples cleared. Welcome back!');
    }
    
    // Always switch to canvas view
    setViewMode('canvas');
  };

  const theme = THEMES[currentTheme];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} ${theme.textColor}`}>
      <Header
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onExportPNG={handleExportPNG}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetToHome={handleResetToHome}
      />

      {viewMode === 'affirmations' ? (
        <AffirmationView goals={goals} onClose={() => setViewMode('canvas')} />
      ) : (
        <>
          <main className="pt-16 sm:pt-20 min-h-screen pb-48 md:pb-12">
            {goals.length === 0 ? (
              <div className="relative w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
                <EmptyState 
                  onAddGoal={() => setIsModalOpen(true)} 
                  onLoadExamples={handleLoadExamples}
                  textColor={theme.textColor}
                />
              </div>
            ) : isMobile ? (
              // Mobile Grid Layout
              <div
                ref={canvasRef}
                className="container mx-auto px-4 py-6 grid grid-cols-1 gap-4 max-w-lg"
              >
                {goals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteGoal}
                    onToggleAchieved={handleToggleAchieved}
                    onPositionChange={handlePositionChange}
                    cardBg={theme.cardBg}
                    isMobileGrid={true}
                    textColor={theme.textColor}
                  />
                ))}
              </div>
            ) : (
              // Desktop Canvas Layout
              <div
                ref={canvasRef}
                className="relative w-full min-h-[calc(100vh-5rem)] overflow-x-auto overflow-y-auto touch-none pr-4 xl:pr-52"
              >
                {goals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteGoal}
                    onToggleAchieved={handleToggleAchieved}
                    onPositionChange={handlePositionChange}
                    cardBg={theme.cardBg}
                    isMobileGrid={false}
                    textColor={theme.textColor}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Floating Add Button */}
          {goals.length > 0 && (
            <Button
              onClick={() => {
                setEditingGoal(null);
                setIsModalOpen(true);
              }}
              size="lg"
              className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-2xl bg-white text-purple-900 hover:bg-white/90 z-40"
            >
              <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
            </Button>
          )}

          {/* Add/Edit Goal Modal */}
          <AddGoalModal
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingGoal(null);
            }}
            onSave={handleAddGoal}
            editingGoal={editingGoal}
          />

          {/* Watermark */}
          <Watermark visible={goals.length > 0} textColor={theme.textColor} />

          {/* Stats Panel */}
          <StatsPanel goals={goals} textColor={theme.textColor} />
        </>
      )}

      <Toaster />
    </div>
  );
}
