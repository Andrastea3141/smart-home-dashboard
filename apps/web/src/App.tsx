import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import { dashboardConfig } from "./config";
import { DashboardPage } from "./pages/DashboardPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

const navigationItems = [
  { label: "Dashboard", path: "/" },
  { label: "Einkaufsliste", path: "/shopping" },
  { label: "Kalender", path: "/calendar" },
  { label: "Smart Home", path: "/smart-home" },
  { label: "Einstellungen", path: "/settings" },
] as const;

export function App() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <nav
        aria-label="Hauptnavigation"
        className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-800 bg-slate-950/95 px-3 py-2 backdrop-blur md:sticky md:top-0 md:border-y md:border-x-0"
      >
        <div className="mx-auto flex max-w-7xl justify-between gap-1 md:justify-start">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `min-h-11 rounded-lg px-3 py-2 text-center text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:px-4 ${
                  isActive
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-6 pb-28 md:px-8 md:py-8 md:pb-8">
        <Routes>
          <Route path="/" element={<DashboardPage dashboardName={dashboardConfig.dashboardName} />} />
          <Route path="/shopping" element={<PlaceholderPage title="Einkaufsliste" />} />
          <Route path="/calendar" element={<PlaceholderPage title="Kalender" />} />
          <Route path="/smart-home" element={<PlaceholderPage title="Smart Home" />} />
          <Route path="/settings" element={<PlaceholderPage title="Einstellungen" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
