import { Link, FileText } from "lucide-react";

interface ModeSelectProps {
  onSelect: (mode: "automatic" | "manual") => void;
}

const ModeSelect = ({ onSelect }: ModeSelectProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Analysis Mode</h2>
        <p className="text-muted-foreground">Choose how you want to analyze the profile</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Automatic Mode */}
        <button
          onClick={() => onSelect("automatic")}
          className="glass-card neon-border p-8 hover:brightness-110 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center">
              <Link className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Profile URL</h3>
              <p className="text-sm text-muted-foreground mt-2">Paste the profile link and we'll extract all data automatically</p>
            </div>
            <div className="w-full pt-4 border-t border-secondary space-y-1">
              <p className="text-xs text-muted-foreground">✓ Faster analysis</p>
              <p className="text-xs text-muted-foreground">✓ Auto-detect platform</p>
            </div>
          </div>
        </button>

        {/* Manual Mode */}
        <button
          onClick={() => onSelect("manual")}
          className="glass-card neon-border p-8 hover:brightness-110 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Username</h3>
              <p className="text-sm text-muted-foreground mt-2">Enter the username manually for granular control</p>
            </div>
            <div className="w-full pt-4 border-t border-secondary space-y-1">
              <p className="text-xs text-muted-foreground">✓ More control</p>
              <p className="text-xs text-muted-foreground">✓ No URL parsing</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelect;
