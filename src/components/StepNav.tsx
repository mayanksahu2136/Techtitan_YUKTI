import { ArrowLeft, ArrowRight, Home } from "lucide-react";

interface StepNavProps {
  onBack?: () => void;
  onForward?: () => void;
  onHome: () => void;
}

const StepNav = ({ onBack, onForward, onHome }: StepNavProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-3 bg-background/80 backdrop-blur border-b border-border">
      <div className="flex items-center gap-1">
        <button
          onClick={onBack}
          disabled={!onBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onForward}
          disabled={!onForward}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary text-foreground"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="ml-auto">
        <button
          onClick={onHome}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary text-primary"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
      </div>
    </nav>
  );
};

export default StepNav;
