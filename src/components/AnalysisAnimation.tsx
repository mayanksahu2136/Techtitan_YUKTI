import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

interface AnalysisAnimationProps {
  onComplete: () => void;
}

const AnalysisAnimation = ({ onComplete }: AnalysisAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const scanSteps = [
    "Initializing security protocol...",
    "Fetching account metadata...",
    "Analyzing engagement metrics...",
    "Processing bio and content...",
    "Evaluating account age and growth...",
    "Running NLP scam detection...",
    "Cross-referencing known patterns...",
    "Computing trust score...",
    "Generating forensic report...",
    "Analysis complete.",
  ];

  useEffect(() => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < scanSteps.length) {
        setLogs((prev) => [...prev, scanSteps[stepIndex]]);
        setProgress(((stepIndex + 1) / scanSteps.length) * 100);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center animate-pulse">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Analysis in Progress</h2>
          <p className="text-muted-foreground">Performing forensic investigation...</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Scanning...</span>
          <span className="font-mono font-semibold text-primary">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Console Output */}
      <div className="glass-card p-6 border-accent/20 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs text-accent">FORENSIC_CONSOLE</span>
        </div>

        <div className="bg-black/20 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-xs">
              <span className="text-primary">&gt;</span> Awaiting input...
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="text-accent/80 mb-2 text-xs">
                <span className="text-primary mr-2">&gt;</span>
                <span className="inline-block animate-pulse">{log}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-secondary">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
          <span className="text-xs text-muted-foreground ml-2">Processing data signature...</span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Step {Math.min(Math.ceil(progress / 10), scanSteps.length)} of {scanSteps.length}</span>
        <span className="text-accent font-mono">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default AnalysisAnimation;
