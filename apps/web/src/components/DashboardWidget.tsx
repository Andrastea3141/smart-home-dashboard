export type WidgetStatus = "loading" | "success" | "empty" | "error";

type DashboardWidgetProps = {
  title: string;
  status: WidgetStatus;
};

const contentByStatus: Record<WidgetStatus, { heading: string; detail: string }> = {
  loading: {
    heading: "Wird geladen",
    detail: "Aktuelle Daten werden abgerufen.",
  },
  success: {
    heading: "Bereit",
    detail: "Der Bereich ist mit dem Backend verbunden.",
  },
  empty: {
    heading: "Keine Einträge",
    detail: "Für heute liegen keine Informationen vor.",
  },
  error: {
    heading: "Vorübergehend nicht verfügbar",
    detail: "Bitte versuche es später erneut.",
  },
};

const statusStyles: Record<WidgetStatus, string> = {
  loading: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  empty: "border-slate-600 bg-slate-800 text-slate-300",
  error: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export function DashboardWidget({ title, status }: DashboardWidgetProps) {
  const content = contentByStatus[status];

  return (
    <article className="min-h-52 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <div className="mt-10">
        <p className="text-lg font-medium">{content.heading}</p>
        <p className="mt-2 text-slate-400">{content.detail}</p>
      </div>
    </article>
  );
}
