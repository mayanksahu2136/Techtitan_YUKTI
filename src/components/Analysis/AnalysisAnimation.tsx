import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

interface AnalysisAnimationProps {
  onComplete: () => void;
}

const MESSAGES = [
  "Scanning digital footprints…",
  "Analyzing behavioral patterns…",
  "Evaluating risk vectors…",
  "Cross-referencing data points…",
  "Generating trust profile…",
];

const AnalysisAnimation = ({ onComplete }: AnalysisAnimationProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <section className="min-h-screen flex items-center justify-center cyber-grid-bg px-6">
      <div className="text-center max-w-md">
        {/* Rotating shield */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-rotate-slow" />
          <div className="absolute inset-2 rounded-full border border-dashed border-primary/40 animate-[rotate-slow_6s_linear_infinite_reverse]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-12 h-12 text-primary animate-scan-pulse" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-secondary/50 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100 neon-glow"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="font-mono text-primary text-sm mb-2">{progress}%</p>
        <p className="text-muted-foreground text-sm h-6 transition-all">
          {MESSAGES[messageIndex]}
        </p>
      </div>
    </section>
  );
};

export default AnalysisAnimation;
