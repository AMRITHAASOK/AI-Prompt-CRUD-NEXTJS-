'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type SavedPrompt = {
  _id: string;
  title?: string;
  description: string;
  promptText: string;
  category: string;
  tags?: string[];
  author: string;
  createdAt?: string;
  favorite?: boolean;
};

const buttonClass = 'inline-flex h-10 w-28 shrink-0 items-center justify-center rounded-full border px-3 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60';

export default function Saved() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/prompts')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load saved prompts');
        return response.json();
      })
      .then((data) => setPrompts((data.allPrompts ?? []).filter((prompt: SavedPrompt) => prompt.favorite)))
      .catch(() => setError('Saved prompts could not be loaded. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  async function removeSaved(id: string) {
    setRemovingId(id);
    setError('');
    try {
      const response = await fetch(`/api/prompts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: false }),
      });
      if (!response.ok) throw new Error('Could not remove saved prompt');
      setPrompts((current) => current.filter((prompt) => prompt._id !== id));
    } catch {
      setError('Could not remove this saved prompt. Please try again.');
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-10">
      <section className="mb-10 rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white to-blue-100 px-6 py-9 shadow-lg shadow-blue-950/5 sm:px-10 md:px-14 md:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Your collection</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Saved prompts</h1>
        <p className="mt-3 text-slate-600">Keep useful prompts close and come back to them whenever you need.</p>
      </section>

      {error && <p role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}
      {loading ? (
        <p className="py-16 text-center text-slate-500">Loading saved prompts...</p>
      ) : prompts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-slate-800">Your collection is empty</h2>
          <p className="mt-2 text-slate-500">Save a prompt from the library and it will show up here.</p>
          <Link href="/prompts" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-blue-950 px-6 font-semibold text-white transition hover:bg-blue-800">Browse prompts</Link>
        </div>
      ) : (
        <section aria-label="Saved prompts" className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {prompts.map((prompt) => (
            <article key={prompt._id} className="flex min-h-[24rem] flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-md shadow-blue-950/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
              <div className="h-1.5 bg-gradient-to-r from-blue-950 via-blue-600 to-sky-400" />
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-flex h-9 w-fit items-center rounded-full bg-blue-50 px-4 text-sm font-semibold text-blue-900 ring-1 ring-inset ring-blue-100">{prompt.category}</span>
                <h2 className="mt-5 line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug text-slate-950">{prompt.title || prompt.description}</h2>
                <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-relaxed text-slate-600">{prompt.title ? prompt.description : 'Reusable AI prompt'}</p>
                <p className="mt-4 line-clamp-3 whitespace-pre-wrap break-words rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">{prompt.promptText}</p>
                <div className="mt-4 flex min-h-7 flex-wrap gap-2">
                  {(prompt.tags ?? []).slice(0, 4).map((tag, index) => <span key={`${tag}-${index}`} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">#{tag}</span>)}
                </div>
                <div className="mt-auto pt-5">
                  <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{prompt.author}</span>
                    <span>{prompt.createdAt ? new Date(prompt.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <Link href={`/prompts/${prompt._id}`} className={`${buttonClass} border-blue-950 bg-blue-950 text-white hover:bg-blue-800`}>View prompt</Link>
                    <button type="button" onClick={() => removeSaved(prompt._id)} disabled={removingId === prompt._id} className={`${buttonClass} border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100`}>{removingId === prompt._id ? 'Removing...' : 'Remove saved'}</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
