import { DashboardWidget, type WidgetStatus } from "../components/DashboardWidget";

const widgetStates: Array<{ status: WidgetStatus; title: string }> = [
  { title: "Wetter", status: "loading" },
  { title: "Kalender", status: "empty" },
  { title: "Einkaufsliste", status: "error" },
  { title: "Smart Home", status: "success" },
];

export function DashboardPage() {
  const today = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
  }).format(new Date());
  const time = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return (
    <section aria-labelledby="dashboard-title">
      <div className="flex flex-col gap-1 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">{today}</p>
          <h2 id="dashboard-title" className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Guten Tag
          </h2>
        </div>
        <time className="text-3xl font-semibold tabular-nums text-cyan-300" dateTime={new Date().toISOString()}>
          {time}
        </time>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {widgetStates.map((widget) => (
          <DashboardWidget key={widget.title} title={widget.title} status={widget.status} />
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-400" role="status">
        Die Beispielzustände demonstrieren, dass Widgets unabhängig geladen und behandelt werden.
      </p>
    </section>
  );
}
