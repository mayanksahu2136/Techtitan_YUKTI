import { Instagram } from "lucide-react";

interface PlatformSelectProps {
  onSelect: (platform: "instagram" | "facebook") => void;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PlatformSelect = ({ onSelect }: PlatformSelectProps) => {
  const platforms = [
    {
      id: "instagram" as const,
      name: "Instagram",
      icon: <Instagram className="w-10 h-10" />,
      desc: "Profile & post analysis",
    },
    {
      id: "facebook" as const,
      name: "Facebook",
      icon: <FacebookIcon />,
      desc: "Account verification scan",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center cyber-grid-bg px-6">
      <div className="max-w-2xl w-full text-center">
        <p className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-3 opacity-0 animate-fade-in">
          Step 1
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 opacity-0 animate-fade-in [animation-delay:100ms]">
          Select Platform
        </h2>
        <p className="text-muted-foreground mb-10 opacity-0 animate-fade-in [animation-delay:200ms]">
          Choose the social media platform to investigate
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 opacity-0 animate-fade-in [animation-delay:300ms]">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="glass-card neon-border p-8 flex flex-col items-center gap-4 hover:bg-secondary/50 transition-all duration-300 hover:scale-[1.03] group cursor-pointer"
            >
              <div className="text-primary group-hover:drop-shadow-[0_0_12px_hsl(175_100%_50%_/_0.6)] transition-all">
                {p.icon}
              </div>
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSelect;
