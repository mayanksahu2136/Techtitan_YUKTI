import React from "react";
import { Search, Circle } from "lucide-react";

const TopNav: React.FC = () => {
  return (
    <header className="h-14 flex items-center px-4 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search profiles, reports, or IDs"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-card/60 border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary">
            <Circle className="w-3 h-3 text-accent" />
            <span className="text-xs text-muted-foreground">Scan: idle</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-card flex items-center justify-center text-sm font-semibold">JS</div>
            <div className="text-sm">
              <div className="font-semibold">Jane Smith</div>
              <div className="text-xs text-muted-foreground">Analyst</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
