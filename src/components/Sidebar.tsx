import React from "react";
import { Shield } from "lucide-react";

const NavItem: React.FC<{ label: string; hint?: string; onClick?: () => void }> = ({ label, hint, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-3 rounded-md hover:bg-sidebar/20 transition-colors flex items-center justify-between"
  >
    <span className="text-sm font-medium">{label}</span>
    {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
  </button>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 border-r border-sidebar p-4 bg-sidebar overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-md bg-card flex items-center justify-center text-primary shadow-sm">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight">Social Shield</h3>
          <p className="text-xs text-muted-foreground">Investigation Console</p>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full px-4 py-3 rounded-md bg-primary/8 text-primary font-semibold hover:brightness-105 transition">
          New Scan
        </button>
        <NavItem label="Scan History" hint="Recent runs" />
        <NavItem label="API Status" hint="Connected" />
        <NavItem label="Documentation" />
        <NavItem label="Privacy & About" />
      </div>

      <div className="mt-auto pt-6 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Social Shield</p>
      </div>
    </aside>
  );
};

export default Sidebar;
