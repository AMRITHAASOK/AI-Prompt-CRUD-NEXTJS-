import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center px-4 py-12 sm:px-8 lg:px-10">
      <section className="relative grid w-full gap-8 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-white to-blue-100 p-6 shadow-xl shadow-blue-950/5 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="relative">
          <span className="inline-flex h-9 items-center rounded-full bg-blue-50 px-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-800 ring-1 ring-inset ring-blue-100">
            AI prompt marketplace
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Better prompts. <span className="text-blue-700">Better results.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Discover, save, and organize reusable prompts for ChatGPT, Midjourney, Claude, and the tools you use every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/prompts" className="inline-flex h-12 items-center justify-center rounded-full bg-blue-950 px-6 font-semibold text-white shadow-md shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-800">
              Browse prompts
            </Link>
            <Link href="/prompts/add" className="inline-flex h-12 items-center justify-center rounded-full border border-blue-200 bg-white px-6 font-semibold text-blue-950 transition hover:border-blue-300 hover:bg-blue-50">
              Create a prompt
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
            <span><strong className="text-slate-800">Find</strong> by category or keyword</span>
            <span><strong className="text-slate-800">Save</strong> useful prompts</span>
            <span><strong className="text-slate-800">Reuse</strong> them in one click</span>
          </div>
        </div>

        <div className="relative rounded-[1.75rem] border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5 sm:p-7">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Your workspace</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">A library built for your workflow</h2>
            </div>
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-800">✦</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { category: 'Writing', title: 'Portfolio summary', detail: 'Turn your experience into a clear introduction.' },
              { category: 'Automation', title: 'Deployment workflow', detail: 'Plan repeatable steps for shipping projects.' },
              { category: 'Creative', title: 'Visual concept builder', detail: 'Shape an idea into a detailed image prompt.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-blue-200 hover:bg-blue-50/60">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-100">{item.category}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
          <Link href="/prompts" className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-blue-950 px-5 font-semibold text-white transition hover:bg-blue-800">
            Explore the library <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
