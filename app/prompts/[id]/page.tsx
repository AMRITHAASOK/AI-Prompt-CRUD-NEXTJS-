import { notFound } from 'next/navigation';
import { connectionDB } from '@/lib/db';
import Prompt from '@/models/prompt';
import CopyPromptButton from '@/components/CopyPromptButton';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function View({ params }: Props) {
  const { id } = await params;

  await connectionDB();
  const prompt = await Prompt.findById(id).lean();

  if (!prompt) notFound();

  return (
    <main className="mx-auto min-h-[calc(100vh-10rem)] w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-10">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-blue-100 bg-white p-6 shadow-lg shadow-blue-950/5 sm:p-8 md:p-12">
        <Link href="/prompts" className="mb-8 inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950">← Back to prompts</Link>
        <span className="inline-flex h-9 items-center rounded-full bg-blue-50 px-4 text-sm font-semibold text-blue-900 ring-1 ring-inset ring-blue-100">
          {prompt.category}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          {prompt.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {prompt.description}
        </p>

        <section className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-5 sm:p-7">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">
            Prompt text
          </h2>
          <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed text-slate-800">
            {prompt.promptText}
          </p>
          <CopyPromptButton text={prompt.promptText} />
        </section>

        {prompt.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {prompt.tags.map((tag: string, index: number) => (
              <span key={`${tag}-${index}`} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-900">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p className="mt-8 text-sm text-slate-500">By {prompt.author}</p>
      </article>
    </main>
  );
}
