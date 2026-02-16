import { Scan, Camera } from "lucide-react";

interface ModeSelectProps {
  onSelect: (mode: "automatic" | "manual") => void;
}

const ModeSelect = ({ onSelect }: ModeSelectProps) => {
  const modes = [
    {
      id: "automatic" as const,
      name: "Automatic Mode",
      icon: <Scan className="w-10 h-10" />,
      desc: "Enter a username and let our system scan the profile automatically.",
    },
    {
      id: "manual" as const,
      name: "Manual Mode",
      icon: <Camera className="w-10 h-10" />,
      desc: "Upload 4 screenshots of the profile for manual pattern analysis.",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center cyber-grid-bg px-6">
      <div className="max-w-2xl w-full text-center">
        <p className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-3 opacity-0 animate-fade-in">
          Step 2
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 opacity-0 animate-fade-in [animation-delay:100ms]">
          Choose Analysis Mode
        </h2>
        <p className="text-muted-foreground mb-10 opacity-0 animate-fade-in [animation-delay:200ms]">
          Select how you'd like to investigate the account
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 opacity-0 animate-fade-in [animation-delay:300ms]">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className="glass-card neon-border p-8 flex flex-col items-center gap-4 hover:bg-secondary/50 transition-all duration-300 hover:scale-[1.03] group cursor-pointer text-left"
            >
              <div className="text-primary group-hover:drop-shadow-[0_0_12px_hsl(175_100%_50%_/_0.6)] transition-all">
                {m.icon}
              </div>
              <h3 className="text-xl font-semibold text-center">{m.name}</h3>
              <p className="text-sm text-muted-foreground text-center">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModeSelect;
