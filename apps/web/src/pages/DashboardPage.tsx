import { DashboardWidget, type WidgetStatus } from "../components/DashboardWidget";

const widgetStates: Array<{ status: WidgetStatus; title: string }> = [
  { title: "Wetter", status: "loading" },
  { title: "Kalender", status: "empty" },
  { title: "Einkaufsliste", status: "error" },
  { title: "Smart Home", status: "success" },
];

type DashboardPageProps = {
  dashboardName: string;
};

export function DashboardPage({ dashboardName }: DashboardPageProps) {
  const now = new Date();
  const today = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(now);
  const time = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  return (
    <section aria-labelledby="dashboard-title">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-slate-800 pb-3">
        <h1 id="dashboard-title" className="text-3xl leading-10 font-bold tracking-tight sm:text-4xl sm:leading-11">
          {dashboardName}
        </h1>
        <time className="flex flex-col items-end font-semibold tabular-nums text-cyan-300" dateTime={now.toISOString()}>
          <span className="text-3xl leading-7">{time}</span>
          <span className="text-sm leading-3 text-slate-400 sm:text-base sm:leading-4">{today}</span>
        </time>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {widgetStates.map((widget) => (
          <DashboardWidget key={widget.title} title={widget.title} status={widget.status} />
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-400" role="status">
        Die Beispielzustände demonstrieren, dass Widgets unabhängig geladen und behandelt werden.
      </p>
    </section>
  );
}
