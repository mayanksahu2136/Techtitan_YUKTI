import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { analysisService } from "@/services/api";

interface ManualModeProps {
  platform: "instagram" | "facebook";
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const SLOTS = ["Profile Bio", "Username", "Captions / Posts", "Age / Details"];

const ManualMode = ({ platform, onSubmit, isLoading = false }: ManualModeProps) => {
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
  const [formData, setFormData] = useState({
    bio: "",
    username: "",
    follower_count: "",
    following_count: "",
    post_count: "",
  });

  const handleFile = useCallback((file: File, index: number) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => {
        const next = [...prev];
        next[index] = reader.result as string;
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const removeImage = (index: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const allUploaded = images.every(Boolean);
  const formValid = formData.bio && formData.username && formData.follower_count && formData.following_count && formData.post_count;

  const handleAnalyze = async () => {
    if (!allUploaded || !formValid) return;

    const data = new FormData();
    data.append("platform", platform);
    data.append("bio", formData.bio);
    data.append("username", formData.username);
    data.append("follower_count", formData.follower_count);
    data.append("following_count", formData.following_count);
    data.append("post_count", formData.post_count);

    // Add image files from DataURL
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        const blob = await (await fetch(images[i]!)).blob();
        data.append(`screenshots`, blob, `screenshot_${i}.jpg`);
      }
    }

    onSubmit(data);
  };

  return (
    <section className="min-h-screen flex items-center justify-center cyber-grid-bg px-6 py-16">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <p className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-3 opacity-0 animate-fade-in">
            Manual Analysis
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 opacity-0 animate-fade-in [animation-delay:100ms]">
            Profile Details & Screenshots
          </h2>
          <p className="text-muted-foreground opacity-0 animate-fade-in [animation-delay:200ms]">
            Upload 4 screenshots and provide account details for analysis
          </p>
        </div>

        <div className="glass-card neon-border p-8 space-y-8">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Enter profile bio..."
                disabled={isLoading}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="@username"
                disabled={isLoading}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Followers</label>
              <input
                type="number"
                value={formData.follower_count}
                onChange={(e) => handleInputChange("follower_count", e.target.value)}
                placeholder="0"
                disabled={isLoading}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Following</label>
              <input
                type="number"
                value={formData.following_count}
                onChange={(e) => handleInputChange("following_count", e.target.value)}
                placeholder="0"
                disabled={isLoading}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Posts</label>
              <input
                type="number"
                value={formData.post_count}
                onChange={(e) => handleInputChange("post_count", e.target.value)}
                placeholder="0"
                disabled={isLoading}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          {/* Screenshots */}
          <div>
            <label className="text-sm font-semibold mb-4 block">Screenshots (4 required)</label>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {SLOTS.map((label, i) => (
                <div key={i} className="relative">
                  {images[i] ? (
                    <div className="glass-card neon-border aspect-square overflow-hidden relative group">
                      <img src={images[i]!} alt={label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => removeImage(i)}
                          disabled={isLoading}
                          className="p-2 bg-destructive rounded-full text-destructive-foreground disabled:opacity-50"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <span className="absolute bottom-2 left-2 text-xs font-mono bg-background/80 px-2 py-1 rounded">
                        {label}
                      </span>
                    </div>
                  ) : (
                    <label className="glass-card neon-border aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-secondary/50 transition-all group disabled:opacity-50">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs text-muted-foreground text-center px-2">{label}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isLoading}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleFile(f, i);
                        }}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleAnalyze}
              disabled={!allUploaded || !formValid || isLoading}
              className="w-full px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed neon-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Submit for Analysis
                </>
              )}
            </button>
            {!allUploaded && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Please upload all 4 screenshots to proceed
              </p>
            )}
            {allUploaded && !formValid && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Please fill in all fields to proceed
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManualMode;
