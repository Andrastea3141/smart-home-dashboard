export type DashboardRuntimeConfig = {
  dashboardName?: string;
};

declare global {
  interface Window {
    __DASHBOARD_CONFIG__?: DashboardRuntimeConfig;
  }
}

const configuredDashboardName = window.__DASHBOARD_CONFIG__?.dashboardName?.trim();

export const dashboardConfig = {
  dashboardName: configuredDashboardName || "Smart Home Dashboard",
} as const;
