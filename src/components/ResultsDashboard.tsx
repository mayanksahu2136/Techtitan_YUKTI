import { useEffect, useState, useMemo } from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, Home, BarChart3, Target, Zap, TrendingDown } from "lucide-react";
import { AnalysisResult } from "@/services/api";

interface ResultsDashboardProps {
  data: AnalysisResult;
  onNewAnalysis: () => void;
}

const ResultsDashboard = ({ data, onNewAnalysis }: ResultsDashboardProps) => {
  const score = data.trust_score || 50;
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1500;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const getVerdict = () => {
    if (score >= 70) return { label: "SAFE", color: "text-accent", bg: "bg-accent/10 border-accent/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]", icon: <ShieldCheck className="w-6 h-6" />, barColor: "bg-accent" };
    if (score >= 45) return { label: "SUSPICIOUS", color: "text-warning", bg: "bg-warning/10 border-warning/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]", icon: <AlertTriangle className="w-6 h-6" />, barColor: "bg-warning" };
    return { label: "HIGH RISK", color: "text-destructive", bg: "bg-destructive/10 border-destructive/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]", icon: <ShieldAlert className="w-6 h-6" />, barColor: "bg-destructive" };
  };

  const verdict = getVerdict();
  const fakeChance = 100 - score;
  const riskLevel = fakeChance > 55 ? "High" : fakeChance > 30 ? "Medium" : "Low";

  // SVG circle
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const strokeColor = score >= 70 ? "hsl(145 100% 50%)" : score >= 45 ? "hsl(45 100% 55%)" : "hsl(0 85% 55%)";

  const profileData = data.profile_data || data.processed_data || {};
  const breakdown = data.breakdown || {};

  const formattedBreakdown = useMemo(() => {
    if (typeof breakdown !== 'object') return {};
    return breakdown;
  }, [breakdown]);

  if (data.error) {
    return (
      <section className="min-h-screen cyber-grid-bg px-6 py-16 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="glass-card neon-border p-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-lg bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-destructive" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-destructive">Analysis Engine Offline</h2>
              <p className="text-sm font-mono mb-4 opacity-80">{data.error}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The core analysis module encountered a transmission error.
                Please verify your backend status and try again.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                Restart Uplink
              </button>
              <button
                onClick={onNewAnalysis}
                className="w-full px-6 py-3 bg-secondary/30 text-foreground font-semibold rounded-lg hover:bg-secondary/50 transition-all"
              >
                Return to Command Center
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen cyber-grid-bg px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <p className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-2">Authenticity Dossier</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Investigation Results</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* LEFT: Profile & Summary */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card neon-border p-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-center group">
                <div className="mb-6 relative inline-block">
                  <div className="absolute -inset-1 bg-primary rounded-full blur opacity-25 group-hover:opacity-50 transition-all duration-300"></div>
                  <img
                    src={profileData.profile_image_url || `https://ui-avatars.com/api/?name=${profileData.username || 'user'}&background=random&size=400`}
                    alt={profileData.username || 'Profile'}
                    className="w-32 h-32 rounded-full border-4 border-secondary relative z-10 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  {score >= 70 && <ShieldCheck className="absolute bottom-1 right-1 w-8 h-8 text-accent bg-secondary rounded-full p-1 z-20 shadow-lg border-2 border-accent" />}
                </div>
                <h2 className="text-2xl font-bold mb-1 tracking-tight">@{profileData.username || 'Unknown'}</h2>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-widest">{profileData.platform || 'General'}</span>
                  {profileData.is_real_data && <span className="text-[10px] font-mono bg-accent/10 text-accent px-2 py-0.5 rounded uppercase tracking-widest">Real Stream</span>}
                </div>

                <div className="space-y-4 text-left">
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-secondary/30">
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Posts</p>
                      <p className="font-mono font-bold">{profileData.post_count ?? 'N/A'}</p>
                    </div>
                    <div className="text-center border-x border-secondary/30">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Follows</p>
                      <p className="font-mono font-bold">{profileData.followers ? parseInt(String(profileData.followers)).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground uppercase mb-1">Following</p>
                      <p className="font-mono font-bold">{profileData.following ? parseInt(String(profileData.following)).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>

                  {profileData.bio && (
                    <div className="pt-2">
                      <p className="text-[11px] font-mono text-primary uppercase tracking-wider mb-2">Account Bio</p>
                      <p className="text-sm bg-secondary/20 p-4 rounded-lg italic leading-relaxed text-muted-foreground line-clamp-4">
                        "{profileData.bio}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onNewAnalysis}
              className="w-full py-4 bg-secondary/30 text-foreground font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-secondary/50 transition-all border border-secondary"
            >
              <Home className="w-5 h-5" />
              New Investigation
            </button>
          </div>

          {/* RIGHT: Scoring Dashboard */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card neon-border p-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Score Gauge */}
                <div className="relative shrink-0">
                  <svg width="220" height="220" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r={radius} fill="none" stroke="hsl(215 25% 12%)" strokeWidth="12" />
                    <circle
                      cx="90" cy="90" r={radius} fill="none"
                      stroke={strokeColor}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 90 90)"
                      style={{ transition: "stroke-dashoffset 0.1s ease-out", filter: `drop-shadow(0 0 12px ${strokeColor}44)` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold font-mono tracking-tighter" style={{ color: strokeColor }}>{animatedScore}</span>
                    <span className="text-[10px] font-mono opacity-50 uppercase tracking-[0.2em] mt-1">Trust Units</span>
                  </div>
                </div>

                {/* Verdict Info */}
                <div className="flex-1 space-y-6 w-full">
                  <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${verdict.bg}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`p-2 rounded-lg bg-background/50`}>{verdict.icon}</div>
                      <div>
                        <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest leading-none mb-1">System Verdict</p>
                        <h3 className={`text-2xl font-black font-mono tracking-tighter ${verdict.color}`}>{verdict.label}</h3>
                      </div>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed font-medium capitalize">
                      This account has been classified as <span className="underline underline-offset-4">{verdict.label.toLowerCase()}</span> based on {Object.keys(formattedBreakdown).length} distinct risk parameters.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/20 p-4 rounded-xl border border-secondary">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Bot Probability</p>
                      <p className="text-3xl font-black font-mono">{fakeChance}%</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-xl border border-secondary">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Final Risk Rank</p>
                      <p className={`text-3xl font-black font-mono ${verdict.color}`}>{riskLevel}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Factor Overview (Pie/Donut Chart) */}
              <div className="mt-16 pt-10 border-t border-secondary/30">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Risk Factor Distribution
                  </h3>
                  <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest text-right">Weight-Adjusted Visualization</span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-around gap-12 bg-secondary/5 p-8 rounded-[2rem] border border-secondary/20">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                      {(() => {
                        let currentAngle = 0;
                        return Object.entries(formattedBreakdown).map(([key, factor]: [string, any], index) => {
                          // Weights are 30, 20, 20, 30. Total 100.
                          const weight = (factor.weight || 0.25) * 100;
                          const percentage = weight; // Slice size is based on its weight/importance

                          // SVG path for a donut slice
                          const strokeWidth = 12;
                          const radius = 40;
                          const circumference = 2 * Math.PI * radius;
                          const offset = circumference - (percentage / 100) * circumference;
                          const rotation = (currentAngle / 100) * circumference;

                          const color = factor.score >= 70 ? "hsl(142 70% 45%)" : factor.score >= 45 ? "hsl(45 90% 45%)" : "hsl(0 85% 45%)";

                          currentAngle += percentage;

                          return (
                            <circle
                              key={key}
                              cx="50"
                              cy="50"
                              r={radius}
                              fill="none"
                              stroke={color}
                              strokeWidth={strokeWidth}
                              strokeDasharray={circumference}
                              strokeDashoffset={offset}
                              transform={`rotate(${(currentAngle - percentage) * 3.6} 50 50)`}
                              className="transition-all duration-1000 ease-in-out hover:opacity-80 cursor-help"
                              style={{
                                filter: `drop-shadow(0 0 4px ${color}44)`
                              }}
                            />
                          );
                        });
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-black font-mono leading-none">{score}</span>
                      <span className="text-[8px] font-bold uppercase opacity-40">Global</span>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    {Object.entries(formattedBreakdown).map(([key, factor]: [string, any]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-secondary/20 group hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${factor.score >= 70 ? 'bg-accent' : factor.score >= 45 ? 'bg-warning' : 'bg-destructive'}`}></div>
                          <span className="text-xs font-bold uppercase tracking-widest opacity-80">{key.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-black">{Math.round((factor.weight || 0) * 100)}% Weight</span>
                          <p className={`text-[10px] font-bold ${factor.score >= 70 ? 'text-accent' : factor.score >= 45 ? 'text-warning' : 'text-destructive'}`}>
                            {factor.score}% Real
                          </p>
                        </div>
                      </div>
                    ))}
                    <p className="text-[10px] text-muted-foreground italic text-center pt-2">
                      Pie slices indicate factor importance; colors indicate authenticity level.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Breakdown Accordion */}
            <div className="space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-2xl font-black tracking-tighter">Analysis Breakdown</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">Deep Scan Active</span>
                </div>
              </div>

              {Object.entries(formattedBreakdown).map(([key, factor]: [string, any]) => {
                const simpleLabels: Record<string, string> = {
                  'bio_scam_keywords': 'Bio Check',
                  'username_characteristics': 'Username Check',
                  'post_repetition': 'Post Check',
                  'follower_ratio': 'Social Network Check'
                };

                const simpleExplain: Record<string, { found: string, why: string }> = {
                  'bio_scam_keywords': {
                    found: factor.score > 70 ? "No suspicious words found in the bio." : `Detected ${factor.metric || 'suspicious language'} in the profile summary.`,
                    why: "Scammers often use words like 'crypto' or 'easy money' to trick people. A clean bio is a sign of a real person."
                  },
                  'username_characteristics': {
                    found: factor.score > 70 ? "The username looks like a natural name." : "The name has too many random numbers or symbols.",
                    why: "Real people pick easy names. Computer-made 'bot' accounts often have random, messy names."
                  },
                  'post_repetition': {
                    found: "The account doesn't seem to be spamming the same posts.",
                    why: "Bots often post the same thing over and over. Real people share different updates."
                  },
                  'follower_ratio': {
                    found: factor.score > 70 ? "The account has a healthy balance of followers." : "The account follows too many people compared to its followers.",
                    why: "Fake accounts follow thousands of people trying to get follow-backs, but usually have very few followers themselves."
                  }
                };

                const info = simpleExplain[key] || { found: factor.reason, why: "This helps determine if the account is human." };

                return (
                  <div key={key} className={`glass-card border-secondary transition-all duration-400 group overflow-hidden ${expandedFactor === key ? 'bg-secondary/10 ring-1 ring-primary/20' : 'hover:bg-secondary/5'}`}>
                    <button
                      onClick={() => setExpandedFactor(expandedFactor === key ? null : key)}
                      className="w-full p-8 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-8">
                        <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-400 ${factor.score >= 70 ? 'bg-accent/10 border-accent/30 text-accent' : factor.score >= 45 ? 'bg-warning/10 border-warning/30 text-warning' : 'bg-destructive/10 border-destructive/30 text-destructive'}`}>
                          <span className="text-2xl font-black font-mono leading-none">{factor.score ?? 0}</span>
                          <span className="text-[8px] font-black uppercase mt-1 opacity-60">SCORE</span>
                        </div>
                        <div>
                          <h4 className="font-black capitalize text-xl tracking-tight mb-1 group-hover:text-primary transition-colors">{simpleLabels[key] || key.replace(/_/g, ' ')}</h4>
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${factor.score >= 70 ? 'bg-accent' : factor.score >= 45 ? 'bg-warning' : 'bg-destructive'}`}></div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              {factor.score > 80 ? 'Reliable' : factor.score > 50 ? 'Questionable' : 'High Risk'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-10">
                        <div className="hidden sm:block text-right">
                          <p className="text-[10px] font-mono text-muted-foreground uppercase font-black tracking-widest mb-1 opacity-50">Weight</p>
                          <span className="text-sm font-black text-primary">{(factor.weight || 0) * 100}%</span>
                        </div>
                        <ChevronDown className={`w-6 h-6 transition-all duration-400 ${expandedFactor === key ? 'text-primary rotate-180' : 'text-muted-foreground opacity-30 group-hover:opacity-100'}`} />
                      </div>
                    </button>

                    {expandedFactor === key && (
                      <div className="px-8 pb-8 pt-2 space-y-6 animate-in fade-in zoom-in-95 duration-400">
                        <div className="bg-background/60 p-6 rounded-[1.5rem] border border-secondary/40 shadow-inner">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase text-primary tracking-widest">What we found</p>
                              <p className="text-sm font-semibold text-foreground/90 leading-relaxed">
                                {info.found}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-black uppercase text-accent tracking-widest">Why this matters</p>
                              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                {info.why}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="glass-card border-warning/10 bg-warning/[0.02] p-6 text-xs text-muted-foreground">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-warning/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-warning" /></div>
                <div className="space-y-1">
                  <p className="font-bold text-foreground">OPERATIONAL DISCLAIMER</p>
                  <p className="leading-relaxed opacity-80">
                    This analysis uses heuristic pattern recognition and NLP text analysis on public data.
                    Cyber Sleuth results are probability-based indications of authenticity and do not constitute absolute proof or legal evidence.
                    Always maintain operational security when interacting with suspicious entities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDashboard;
