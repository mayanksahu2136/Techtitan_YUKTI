import { Instagram, Facebook } from "lucide-react";

interface PlatformSelectProps {
  onSelect: (platform: "instagram" | "facebook") => void;
}

const PlatformSelect = ({ onSelect }: PlatformSelectProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Platform</h2>
        <p className="text-muted-foreground">Choose the social media platform for analysis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Instagram */}
        <button
          onClick={() => onSelect("instagram")}
          className="glass-card neon-border p-8 hover:brightness-110 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
              <Instagram className="w-8 h-8 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Instagram</h3>
              <p className="text-sm text-muted-foreground mt-2">Analyze profile authenticity and engagement patterns</p>
            </div>
            <div className="w-full pt-4 border-t border-secondary">
              <p className="text-xs text-muted-foreground">Public accounts only</p>
            </div>
          </div>
        </button>

        {/* Facebook */}
        <button
          onClick={() => onSelect("facebook")}
          className="glass-card neon-border p-8 hover:brightness-110 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Facebook className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Facebook</h3>
              <p className="text-sm text-muted-foreground mt-2">Verify profile integrity and community presence</p>
            </div>
            <div className="w-full pt-4 border-t border-secondary">
              <p className="text-xs text-muted-foreground">Public accounts only</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PlatformSelect;
