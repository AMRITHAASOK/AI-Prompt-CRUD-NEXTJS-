import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-8 lg:px-10">
      <section className="w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white p-8 text-center shadow-lg shadow-blue-950/5 sm:p-12">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-800">?</span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Page not found</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">We couldn’t find that page.</h1>
        <p className="mt-3 text-slate-600">The prompt may have been removed, or the address may be incorrect.</p>
        <Link href="/prompts" className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-blue-950 px-6 font-semibold text-white transition hover:bg-blue-800">Browse prompts</Link>
      </section>
    </main>
  );
}
