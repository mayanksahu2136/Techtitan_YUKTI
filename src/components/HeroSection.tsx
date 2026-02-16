import { Shield, Search, AlertTriangle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid-bg">
      {/* Scan line animation */}
      <div className="absolute inset-0 scan-line animate-[scan-sweep_4s_linear_infinite] pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(175_100%_50%_/_0.06)_0%,_transparent_70%)]" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-6 opacity-0 animate-fade-in">
          <Shield className="w-8 h-8 text-primary" />
          <span className="font-mono text-sm text-primary tracking-[0.3em] uppercase">CyberVerify</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in [animation-delay:200ms] leading-tight text-white">
          Uncover the Truth Behind{" "}
          <span className="neon-text">Any Social Media Account</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground text-sm md:text-base mb-10 opacity-0 animate-fade-in [animation-delay:400ms]">
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" /> Detect fake profiles
          </span>
          <span className="hidden sm:block text-border">|</span>
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Measure trust score
          </span>
          <span className="hidden sm:block text-border">|</span>
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" /> Reduce fraud risk
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in [animation-delay:600ms]">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground font-black rounded-xl text-lg neon-glow hover:brightness-110 transition-all duration-300 hover:scale-105 uppercase tracking-widest italic"
          >
            Start Investigation
          </button>

          <Link
            to="/benchmark"
            className="w-full sm:w-auto px-10 py-5 bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-foreground font-black rounded-xl text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-widest italic"
          >
            <BarChart3 className="w-5 h-5 text-primary" />
            System Benchmark
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
