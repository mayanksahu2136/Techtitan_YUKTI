import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry: () => void;
  onHome?: () => void;
}

const ErrorState = ({ 
  title = "Analysis Failed", 
  message, 
  onRetry, 
  onHome 
}: ErrorStateProps) => {
  return (
    <section className="min-h-screen cyber-grid-bg px-6 py-16 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="glass-card neon-border p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground text-sm">{message}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={onRetry}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            {onHome && (
              <button
                onClick={onHome}
                className="w-full px-6 py-3 bg-secondary/30 text-foreground font-semibold rounded-lg hover:bg-secondary/50 transition-all"
              >
                Back to Home
              </button>
            )}
          </div>

          <div className="text-xs text-muted-foreground space-y-1 border-t border-secondary pt-4">
            <p className="font-semibold">Troubleshooting:</p>
            <ul className="space-y-0.5">
              <li>• Check backend is running on localhost:5000</li>
              <li>• Try a different username</li>
              <li>• Ensure profile is public</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorState;
