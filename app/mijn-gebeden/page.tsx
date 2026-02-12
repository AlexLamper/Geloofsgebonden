export default function MijnGebedenPage() {
  return (
    <main className="space-y-8 pb-20">
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/20 to-teal-500/10" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">Mijn dashboard</h1>
          <p className="mt-2 max-w-2xl text-lg text-zinc-300">
            Beheer je eigen gebedspunten en houd zicht op steun vanuit de community.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <article className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-indigo-50 transition-colors group-hover:bg-indigo-100" />
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Openstaande</p>
          <p className="mt-4 text-4xl font-bold text-indigo-600">0</p>
        </article>
        <article className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-emerald-50 transition-colors group-hover:bg-emerald-100" />
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Ondersteund</p>
          <p className="mt-4 text-4xl font-bold text-emerald-600">0</p>
        </article>
        <article className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-amber-50 transition-colors group-hover:bg-amber-100" />
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Afgerond</p>
          <p className="mt-4 text-4xl font-bold text-amber-600">0</p>
        </article>
      </section>

      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight">Recente activiteit</h2>
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
           <div className="rounded-full bg-muted p-4">
             <span className="text-2xl">🌱</span>
           </div>
           <h3 className="mt-4 text-lg font-semibold">Nog geen activiteit</h3>
           <p className="mt-2 text-muted-foreground max-w-sm">
             Begin met het delen van een gebedspunt of vraag op het forum.
           </p>
        </div>
      </section>
    </main>
  );
}
