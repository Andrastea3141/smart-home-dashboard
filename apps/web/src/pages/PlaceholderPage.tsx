type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section aria-labelledby="page-title" className="py-12 text-center">
      <p className="text-sm font-semibold tracking-[0.18em] text-cyan-300 uppercase">
        In Vorbereitung
      </p>
      <h2 id="page-title" className="mt-2 text-3xl font-bold">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-slate-400">
        Dieser Bereich wird in einem kommenden Roadmap-Inkrement umgesetzt.
      </p>
    </section>
  );
}
