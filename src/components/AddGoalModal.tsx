import { useState, useEffect } from 'react';
import { Goal, Category } from '../types';
import { CATEGORIES, DEFAULT_CARD_SIZE } from '../lib/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Upload } from 'lucide-react';

interface AddGoalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  editingGoal?: Goal | null;
}

export function AddGoalModal({ open, onClose, onSave, editingGoal }: AddGoalModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAge, setTargetAge] = useState('');
  const [targetYear, setTargetYear] = useState('');
  const [image, setImage] = useState('');
  const [emoji, setEmoji] = useState('');
  const [category, setCategory] = useState<Category>('growth');

  useEffect(() => {
    if (editingGoal) {
      setTitle(editingGoal.title);
      setDescription(editingGoal.description);
      setTargetAge(editingGoal.targetAge?.toString() || '');
      setTargetYear(editingGoal.targetYear?.toString() || '');
      setImage(editingGoal.image || '');
      setEmoji(editingGoal.emoji || '');
      setCategory(editingGoal.category);
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setTargetAge('');
      setTargetYear('');
      setImage('');
      setEmoji('');
      setCategory('growth');
    }
  }, [editingGoal, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData: Omit<Goal, 'id' | 'createdAt'> = {
      title,
      description,
      targetAge: targetAge ? parseInt(targetAge) : undefined,
      targetYear: targetYear ? parseInt(targetYear) : undefined,
      image: image || undefined,
      emoji: emoji || undefined,
      category,
      position: editingGoal?.position || { x: 100, y: 150 },
      size: editingGoal?.size || DEFAULT_CARD_SIZE,
      achieved: editingGoal?.achieved || false,
    };

    onSave(goalData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] sm:max-h-[90vh] w-[calc(100vw-2rem)] sm:w-full flex flex-col p-0">
        <div className="px-6 pt-6">
          <DialogHeader>
            <DialogTitle>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</DialogTitle>
            <DialogDescription>
              {editingGoal 
                ? 'Update your goal details below.' 
                : 'Create a new goal for your vision board. Fill in the details to bring your dreams to life.'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="space-y-3 sm:space-y-4 overflow-y-auto flex-1 px-6 py-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Goal Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Get Married and Have Kids"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description / Affirmation</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I am building a loving family and creating beautiful memories..."
              rows={3}
            />
          </div>

          {/* Target Age & Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetAge">Target Age</Label>
              <Input
                id="targetAge"
                type="number"
                value={targetAge}
                onChange={(e) => setTargetAge(e.target.value)}
                placeholder="e.g., 40"
              />
            </div>
            <div>
              <Label htmlFor="targetYear">Target Year</Label>
              <Input
                id="targetYear"
                type="number"
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                placeholder="e.g., 2030"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>
                    {cat.icon} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {image ? 'Change Image' : 'Upload Image'}
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {image && (
              <div className="mt-2 relative h-32 rounded-lg overflow-hidden">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Image URL (Alternative) */}
          <div>
            <Label htmlFor="imageUrl">Or paste image URL</Label>
            <Input
              id="imageUrl"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Emoji */}
          <div>
            <Label htmlFor="emoji">Emoji (if no image)</Label>
            <Input
              id="emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="e.g., 🏆"
              maxLength={2}
            />
          </div>
          </div>

          <div className="px-6 pb-6 pt-4 border-t">
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" disabled={!title} className="w-full sm:w-auto">
                {editingGoal ? 'Save Changes' : 'Add Goal'}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
