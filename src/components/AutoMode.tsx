import { useState } from "react";
import { Instagram, Search, Loader2 } from "lucide-react";
import { analysisService } from "@/services/api";

interface AutoModeProps {
  platform: "instagram" | "facebook";
  onAnalyze: (username: string) => void;
  isLoading?: boolean;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AutoMode = ({ platform, onAnalyze, isLoading = false }: AutoModeProps) => {
  const [username, setUsername] = useState("");

  const handleAnalyze = async () => {
    if (!username.trim()) return;
    onAnalyze(username.trim());
  };

  return (
    <section className="min-h-screen flex items-center justify-center cyber-grid-bg px-6">
      <div className="max-w-lg w-full text-center">
        <p className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-3 opacity-0 animate-fade-in">
          Automatic Scan
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 opacity-0 animate-fade-in [animation-delay:100ms]">
          Enter Username
        </h2>
        <p className="text-muted-foreground mb-10 opacity-0 animate-fade-in [animation-delay:200ms]">
          We'll scan the profile and analyze behavioral patterns
        </p>

        <div className="opacity-0 animate-fade-in [animation-delay:300ms]">
          <div className="glass-card neon-border p-8">
            <div className="relative mb-6">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                {platform === "instagram" ? <Instagram className="w-5 h-5" /> : <FacebookIcon />}
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="@username"
                disabled={isLoading}
                className="w-full bg-secondary/50 border border-border rounded-lg py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={!username.trim() || isLoading}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed neon-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoMode;
