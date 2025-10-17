import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Keyboard, Mouse, Sparkles } from 'lucide-react';

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

export function HelpDialog({ open, onClose }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            How to Use Life Designer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Getting Started */}
          <div>
            <h3 className="mb-2">Getting Started</h3>
            <p className="text-muted-foreground">
              Life Designer is your personal vision board tool. Create goals, arrange them on your canvas,
              and visualize your dream future. Everything is saved privately in your browser.
            </p>
          </div>

          {/* Mouse Controls */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mouse className="w-4 h-4" />
              <h3>Canvas Controls</h3>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• <strong>Drag cards</strong> to reposition them on the canvas</li>
              <li>• <strong>Hover over cards</strong> to see action buttons</li>
              <li>• <strong>Click + button</strong> to add new goals</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-2">Key Features</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• <strong>Affirmation Mode:</strong> View your goals as an inspiring slideshow</li>
              <li>• <strong>Themes:</strong> Choose from 6 beautiful gradient themes</li>
              <li>• <strong>Categories:</strong> Organize goals by Health, Career, Relationships, etc.</li>
              <li>• <strong>Progress Tracking:</strong> Mark goals as achieved with the checkmark button</li>
              <li>• <strong>Export:</strong> Download as PNG image or backup as JSON</li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="mb-2">100% Private</h3>
            <p className="text-sm text-muted-foreground">
              All your goals are stored locally in your browser. No data is sent to any server.
              No tracking, no analytics, no account required. Export your data anytime to keep a backup.
            </p>
          </div>

          {/* Tips */}
          <div>
            <h3 className="mb-2">Pro Tips</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Add images to make your vision board more inspiring</li>
              <li>• Write affirmations in present tense ("I am..." instead of "I will...")</li>
              <li>• Set specific target ages or years to stay accountable</li>
              <li>• Review your affirmations regularly for maximum impact</li>
              <li>• Export your board periodically as a backup</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
